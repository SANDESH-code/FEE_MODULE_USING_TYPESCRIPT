import express from 'express';
import { z } from 'zod';

import * as db from '#lib/db.ts';
import * as auth from '#lib/auth.ts';

const router = express.Router();

const create_user_schema = z.object({
  name: z.string(),
  email: z.string().email(),
  rollno: z.string().optional(),
  pass: z.string().min(8),
  type: z.enum(['student','faculty','admin']),
});

router.post('/admin/create_user', async (req, res) =>
{
  try
  {
    const {name, email, rollno, pass, type} = create_user_schema.parse(req.body);
    const pass_hash = await auth.calc_password_hash(name, pass);
    try
    {
      const uid = await db.add_user({name, email, rollno, pass_hash, type});
      res.sendStatus(200);
    }
    catch (err) {
      res.status(400).json({error: 'user already exists'});
    }
  }
  catch (err) {
    res.status(400).json({error: 'invalid request'});
  }
});

export default router;
