import express from 'express';
import { z } from 'zod';

import * as db from '#lib/db.ts';
import * as auth from '#lib/auth.ts';

const router = express.Router();

const login_schema_email = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const login_schema_userid = z.object({
  rollno: z.string(),
  password: z.string().min(8),
});

router.post('/login', async (req, res) =>
{
  var user: db.User|null;
  var upass: string;
  
  try
  {
    const {id, pass} = req.body;
    
    try
    {
      if (id.includes('@')) //treat as email
      {
        const {email, password} = login_schema_email.parse({email:id, password:pass});
        user = await db.get_user_from_email(email);
        upass = password;
      }
      else
      {
        const {rollno, password} = login_schema_userid.parse({rollno:id, password:pass});
        user = await db.get_user_from_rollno(rollno);
        upass = password;
      }
    }
    catch (err) {
      res.status(401).json({error: 'invalid credentials'});
      return;
    }
  }
  catch (err) {
    res.status(400).json({error: 'invalid request'});
    return;
  }
  
  if (user && upass)
  {
    if (await auth.verify_password_hash(user.name, upass, user.pass_hash))
    {
      const session_token = auth.jwt_create(user._id!, user.type);
      res.cookie('session_token', session_token, {expires: new Date(Date.now() + 15*24*3600*1000)}); // 15d expiry, also enforced by jwt
      res.sendStatus(200);
    }
    else res.status(401).json({error: 'incorrect password'});
  }
  else res.status(404).json({error: 'user not found'});
});

export default router;
