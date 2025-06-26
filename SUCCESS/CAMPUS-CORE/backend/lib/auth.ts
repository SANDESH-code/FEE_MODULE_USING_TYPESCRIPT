// C:\Users\chandhu\OneDrive\Desktop\SUCCESS\backend\lib\auth.ts

// Argon2 is unavailable, so use bcryptjs as fallback everywhere
import jwt from 'jsonwebtoken';
import { env } from 'process';

import type * as Argon2Type from 'argon2';

let argon2: typeof Argon2Type | null = null;
try {
  // Dynamically import argon2 if available
  argon2 = require('argon2');
} catch {
  argon2 = null;
}

// Type definitions for better type safety
interface JwtPayload {
  uid: string;
  type: string;
}

// Validate essential environment variables on startup
const validateEnv = () => {
  const requiredVars = {
    ARGON2_PEPPER: env.ARGON2_PEPPER,
    JWT_SECRET: env.JWT_SECRET
  };

  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      throw new Error(`${key} is not defined in environment variables`);
    }
  }
};

try {
  validateEnv();
} catch (error) {
  if (error instanceof Error) {
    console.error('Environment configuration error:', error.message);
  } else {
    console.error('Environment configuration error:', error);
  }
  process.exit(1);
}

/**
 * Calculates password hash using Argon2
 * @param name Username
 * @param pass Password
 * @returns Promise resolving to hashed password
export async function calc_password_hash(name: string, pass: string): Promise<string> {
  try {
    if (argon2) {
      return await argon2.hash(
        `${name}${pass}${env.ARGON2_PEPPER}`,
        { type: (argon2 as any).argon2id ?? (argon2 as any).default?.argon2id } as Argon2Type.Options & { type?: number }
      );
    }
    // Fallback: Use bcryptjs if argon2 is unavailable
    const bcrypt = await import('bcryptjs');
    const saltRounds = 12;
    const salted = `${name}${pass}${env.ARGON2_PEPPER}`;
    return await bcrypt.hash(salted, saltRounds);
  } catch (error) {
    console.error('Password hashing failed:', error);
    throw new Error('Password hashing failed');
  }
}
}

/**
 * Verifies password against stored hash
 * @param name Username
 * @param pass Password attempt
 * @param pass_hash Stored password hash
 * @param pass_hash Stored password hash
 */
export async function verify_password_hash(
  name: string,
  pass: string,
  pass_hash: string
): Promise<boolean> {
  try {
    if (argon2) {
      return await argon2.verify(pass_hash, `${name}${pass}${env.ARGON2_PEPPER}`);
    }
    // Fallback: Use bcryptjs if argon2 is unavailable
    const bcrypt = await import('bcryptjs');
    const salted = `${name}${pass}${env.ARGON2_PEPPER}`;
    return await bcrypt.compare(salted, pass_hash);
  } catch (error) {
    console.error('Password verification failed:', error);
    return false;
  }
}
/**
 * Creates a JWT token
 * @param uid User ID
 * @param type User type (admin/faculty/student)
 * @returns JWT token string
 */
export function jwt_create(uid: string, type: string): string {
  return jwt.sign(
    { uid, type },
    env.JWT_SECRET as string,
    { expiresIn: '15d' }
  );
}

/**
 * Decodes and verifies JWT token
 * @param token JWT token string
 * @returns Decoded payload or null if invalid/expired
 */
export function jwt_decode(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as string) as JwtPayload;
    return decoded?.uid && decoded?.type ? decoded : null;
  } catch (error) {
    return null;
  }
}