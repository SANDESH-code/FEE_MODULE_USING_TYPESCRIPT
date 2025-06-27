import express from 'express';
import { z } from 'zod';
import * as db from '#lib/db';
import * as auth from '#lib/auth';

const router = express.Router();

const login_schema_email = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const login_schema_userid = z.object({
  rollno: z.string().min(1, "Roll number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

router.post('/login', async (req: express.Request, res: express.Response) => {
  try {
    const { id, pass } = req.body;
    
    if (!id || !pass) {
      return res.status(400).json({ error: 'ID and password are required' });
    }

    let user: db.User | null = null;
    let passwordToVerify = pass;

    try {
      if (id.includes('@')) {
        // Email login
        const { email, password } = login_schema_email.parse({
          email: id,
          password: pass
        });
        user = await db.get_user_from_email(email);
        passwordToVerify = password;
      } else {
        // Roll number login
        const { rollno, password } = login_schema_userid.parse({
          rollno: id,
          password: pass
        });
        user = await db.get_user_from_rollno(rollno);
        passwordToVerify = password;
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: err.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
          }))
        });
      }
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.pass_hash) {
      return res.status(500).json({ error: 'User account not properly configured' });
    }

    // Verify password
    const isPasswordValid = await auth.verify_password_hash(user.name, passwordToVerify, user.pass_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    if (!user._id || !user.type) {
      return res.status(500).json({ error: 'User data incomplete' });
    }

    // Create JWT token
    const session_token = auth.jwt_create(user._id, user.type);
    
    // Set cookie
    res.cookie('session_token', session_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 24 * 3600 * 1000 // 15 days
    });
    
    return res.status(200).json({ 
      success: true,
      message: 'Login successful',
      userType: user.type
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;