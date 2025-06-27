import express from 'express';
import { z } from 'zod';
import * as db from '#lib/db';
import * as auth from '#lib/auth';
import bcrypt from 'bcryptjs';

const router = express.Router();

const create_user_schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  rollno: z.string().optional(),
  pass: z.string().min(8, "Password must be at least 8 characters"),
  type: z.enum(['student', 'faculty', 'admin']),
});

router.post('/admin/create_user', async (req, res) => {
  try {
    // Validate request body
    const { name, email, rollno, pass, type } = create_user_schema.parse(req.body);

    // Hash password
    const pass_hash = await bcrypt.hash(pass, 10); // Using bcrypt directly

    try {
      // Create user
      const uid = await db.add_user({ 
        name, 
        email, 
        rollno, 
        pass_hash, 
        type,
        courses: [] // Add empty courses array if your User interface requires it
      });
      
      res.status(201).json({ 
        success: true, 
        message: 'User created successfully',
        userId: uid 
      });
    } catch (err) {
      if (err instanceof Error && err.message.includes('duplicate key')) {
        res.status(409).json({ 
          error: 'User already exists',
          details: 'Email or roll number already in use'
        });
      } else {
        console.error('Error creating user:', err);
        res.status(500).json({ 
          error: 'Internal server error',
          details: 'Failed to create user'
        });
      }
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        error: 'Validation failed',
        details: err.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message
        }))
      });
    } else {
      console.error('Unexpected error:', err);
      res.status(500).json({ 
        error: 'Internal server error',
        details: 'Unexpected error occurred'
      });
    }
  }
});

export default router;