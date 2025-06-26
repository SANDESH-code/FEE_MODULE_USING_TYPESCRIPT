import express from 'express';

import * as db from '#lib/db.ts';
import * as auth from '#lib/auth.ts';

const router = express.Router();

router.post('/mark-attendance', async (req :any , res : any) => {
  const faculty = await db.get_user_from_token(req.cookies.session_token);
  if (!faculty || faculty.type !== 'faculty') return res.status(403).json({ error: 'Only faculty allowed' });

  const { course_id, student_id, date } = req.body;
  if (!course_id || !student_id || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const att_id = await db.mark_attendance(course_id, student_id, new Date(date), faculty._id!);
    res.json({ attendance_id: att_id });
  } catch (err) {
if (err instanceof Error) {
  res.status(400).json({ error: err.message });
} else {
  res.status(400).json({ error: 'Unknown error occurred' });
}  }
});

export default router;
