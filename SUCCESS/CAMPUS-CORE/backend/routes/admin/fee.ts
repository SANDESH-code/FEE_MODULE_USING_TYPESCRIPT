// C:\Users\chandhu\OneDrive\Desktop\SUCCESS\backend\routes\admin\fee.ts

import { Router, Request, Response } from 'express'; // Import Request, Response for better typing
import * as db from '../../lib/db';
import { admin_only } from '../../lib/middlewares';
import { z } from 'zod';
import mongoose from 'mongoose'; // Import mongoose for ObjectId validation

// Define a custom Request type if admin_only middleware adds properties to req
interface CustomRequest extends Request {
  user?: db.User; // Example if admin_only also adds a user object
}

const router = Router();

// Zod schemas for validation (updated for new Fee schema)
const CreateFeeRecordSchema = z.object({
  student_id: z.string().nonempty('Student ID is required.'),
  semester: z.number().int().min(1).max(8, 'Semester must be between 1 and 8.'),
  academic_year: z.string().regex(/^\d{4}-\d{4}$/, 'Academic year must be in YYYY-YYYY format (e.g., 2024-2025).'),
  total_amount: z.number().positive('Total fee amount must be a positive number.'),
  due_date: z.string().datetime('Due date must be a valid ISO 8601 date string.'),
});

const RecordFeePaymentSchema = z.object({
  amount: z.number().positive('Payment amount must be a positive number.'),
  transaction_id: z.string().nonempty('Transaction ID is required.'),
  payment_method: z.enum(['credit_card', 'debit_card', 'net_banking', 'upi', 'cash']),
});

const UpdateFeeRecordSchema = z.object({
  semester: z.number().int().min(1).max(8, 'Semester must be between 1 and 8.').optional(),
  academic_year: z.string().regex(/^\d{4}-\d{4}$/, 'Academic year must be in YYYY-YYYY format (e.g., 2024-2025).').optional(),
  total_amount: z.number().positive('Total fee amount must be a positive number.').optional(),
  due_date: z.union([z.string().datetime('Due date must be a valid ISO 8601 date string.'), z.instanceof(Date)]).optional(),
}).refine(data => Object.keys(data).length > 0, { message: "At least one field must be provided for update." });


/**
 * @route POST /api/v1/admin/fee
 * @description Create a new fee record for a student.
 * @access Admin Only
 */
router.post('/', admin_only, async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const parsedBody = CreateFeeRecordSchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(400).json({ error: 'Invalid input data', details: parsedBody.error.errors });
      return;
    }

    const { student_id, semester, academic_year, total_amount, due_date } = parsedBody.data;

    // Validate student_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(student_id)) {
      res.status(400).json({ error: 'Invalid Student ID format.' });
      return;
    }

    // Check if student exists and is of type 'student'
    const student = await db.get_user_from_uid(student_id);
    if (!student || student.type !== 'student') {
      res.status(404).json({ error: 'Student not found or is not a valid student type.' });
      return;
    }

    const newFeeRecord = await db.createFeeRecord({
      student_id: new mongoose.Types.ObjectId(student_id), // Convert to ObjectId
      semester,
      academic_year,
      total_amount,
      due_date: new Date(due_date),
    });

    res.status(201).json({ message: 'Fee record created successfully', feeId: newFeeRecord._id?.toString() });
  } catch (error: any) {
    console.error('Error creating fee record:', error);
    if (error.message.includes('already exists')) {
      res.status(409).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

/**
 * @route POST /api/v1/admin/fee/:feeId/payment
 * @description Record a payment for an existing fee record.
 * @access Admin Only
 */
router.post('/:feeId/payment', admin_only, async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const feeId = req.params.feeId;
    if (!mongoose.Types.ObjectId.isValid(feeId)) {
      res.status(400).json({ error: 'Invalid Fee ID format.' });
      return;
    }

    const parsedBody = RecordFeePaymentSchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(400).json({ error: 'Invalid payment data', details: parsedBody.error.errors });
      return;
    }

    const { amount, transaction_id, payment_method } = parsedBody.data;

    const updatedFee = await db.recordPayment(feeId, amount, transaction_id, payment_method);

    res.status(200).json({
      message: 'Payment recorded successfully.',
      fee: {
        _id: updatedFee._id?.toString(),
        total_amount: updatedFee.total_amount,
        paid_amount: updatedFee.paid_amount,
        balance_amount: updatedFee.total_amount - updatedFee.paid_amount,
        payment_status: updatedFee.payment_status,
        last_transaction: updatedFee.payment_history[updatedFee.payment_history.length - 1]
      }
    });
    return;
  } catch (error: any) {
    console.error('Error recording fee payment:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
    return;
  }
});

/**
 * @route GET /api/v1/admin/fee
 * @description Get all fee records.
 * @access Admin Only
 */
router.get('/', admin_only, async (req: CustomRequest, res: Response) => {
  try {
    const feeRecords = await db.getAllFeeRecords();
    res.status(200).json(feeRecords.map(record => ({
      _id: record._id?.toString(), // Convert ObjectId to string
      student_id: record.student_id?.toString(), // Convert ObjectId to string
      semester: record.semester,
      academic_year: record.academic_year,
      total_amount: record.total_amount,
      paid_amount: record.paid_amount,
      balance_amount: record.total_amount - record.paid_amount, // Calculate balance dynamically
      payment_status: record.payment_status,
      due_date: record.due_date,
      payment_history: record.payment_history.map(t => ({
        amount: t.amount,
        payment_date: t.payment_date,
        transaction_id: t.transaction_id,
        payment_method: t.payment_method
      }))
    })));
  } catch (error: any) {
    console.error('Error fetching all fee records:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

/**
 * @route GET /api/v1/admin/fee/:feeId
 * @description Get a specific fee record by ID.
 * @access Admin Only
 */
router.get('/:feeId', admin_only, async (req: CustomRequest, res: Response) => {
  try {
    const feeId = req.params.feeId;
    if (!mongoose.Types.ObjectId.isValid(feeId)) {
      res.status(400).json({ error: 'Invalid Fee ID format.' });
      return;
    }

    const feeRecord = await db.getFeeRecordById(feeId);

    if (!feeRecord) {
      res.status(404).json({ message: 'Fee record not found.' });
      return;
    }

    res.status(200).json({
      _id: feeRecord._id?.toString(),
      student_id: feeRecord.student_id?.toString(),
      semester: feeRecord.semester,
      academic_year: feeRecord.academic_year,
      total_amount: feeRecord.total_amount,
      paid_amount: feeRecord.paid_amount,
      balance_amount: feeRecord.total_amount - feeRecord.paid_amount,
      payment_status: feeRecord.payment_status,
      due_date: feeRecord.due_date,
      payment_history: feeRecord.payment_history.map(t => ({
        amount: t.amount,
        payment_date: t.payment_date,
        transaction_id: t.transaction_id,
        payment_method: t.payment_method
      }))
    });
  } catch (error: any) {
    console.error('Error fetching specific fee record:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

/**
 * @route PUT /api/v1/admin/fee/:feeId
 * @description Update an existing fee record.
 * @access Admin Only
 */
router.put('/:feeId', admin_only, async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const feeId = req.params.feeId;
    if (!mongoose.Types.ObjectId.isValid(feeId)) {
      res.status(400).json({ error: 'Invalid Fee ID format.' });
      return;
    }

    const parsedBody = UpdateFeeRecordSchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(400).json({ error: 'Invalid update data', details: parsedBody.error.errors });
      return;
    }
    // Only update allowed fields, not student_id, paid_amount, payment_status, payment_history
    const updateData = { ...parsedBody.data };

    // Ensure due_date is a Date object or undefined
    if ('due_date' in updateData) {
      if (typeof updateData.due_date === 'string') {
        const date = new Date(updateData.due_date);
        if (!isNaN(date.getTime())) {
          updateData.due_date = date;
        } else {
          delete updateData.due_date;
        }
      } else if (updateData.due_date !== undefined && !(updateData.due_date instanceof Date)) {
        delete updateData.due_date;
      }
    }

    const updated = await db.updateFeeRecord(feeId, updateData as Partial<Omit<db.Fee, '_id' | 'student_id' | 'paid_amount' | 'payment_status' | 'payment_history'>>);

    if (updated) {
      res.status(200).json({ message: 'Fee record updated successfully.' });
    } else {
      res.status(404).json({ error: 'Fee record not found or no changes made.' });
    }
  } catch (error: any) {
    console.error('Error updating fee record:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

/**
 * @route DELETE /api/v1/admin/fee/:feeId
 * @description Delete a fee record.
 * @access Admin Only
 */
router.delete('/:feeId', admin_only, async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const feeId = req.params.feeId;
    if (!mongoose.Types.ObjectId.isValid(feeId)) {
      res.status(400).json({ error: 'Invalid Fee ID format.' });
      return;
    }

    const deleted = await db.deleteFeeRecord(feeId);

    if (deleted) {
      res.status(200).json({ message: 'Fee record deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Fee record not found.' });
    }
  } catch (error: any) {
    console.error('Error deleting fee record:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

export default router;
