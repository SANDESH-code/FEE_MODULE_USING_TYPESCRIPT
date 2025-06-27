import express from 'express';
import * as db from '#lib/db.ts';

const router = express.Router();

router.post('/register/:course_id', async (req: any, res: any) => {
   const user = req.user;
  

  try {
    const result = await db.register_student_to_course(user._id!, req.params.course_id);
    res.json({ success: result });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
});

export default router;
