import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export async function calc_password_hash(name: string, pass: string): Promise<string> {
  if (!process.env.ARGON2_PEPPER) {
    throw new Error('ARGON2_PEPPER environment variable is not defined');
  }
  
  return argon2.hash(name + pass, {
    timeCost: 10,
    parallelism: 1,
    memoryCost: 1024, // KiB
    hashLength: 48,
    secret: Buffer.from(process.env.ARGON2_PEPPER)
  });
}

export async function verify_password_hash(name: string, pass: string, pass_hash: string): Promise<boolean> {
  if (!process.env.ARGON2_PEPPER) {
    throw new Error('ARGON2_PEPPER environment variable is not defined');
  }

  try {
    return await argon2.verify(pass_hash, name + pass, {
      secret: Buffer.from(process.env.ARGON2_PEPPER)
    });
  } catch (err) {
    return false;
  }
}

export function jwt_create(uid: string, type: string): string {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }
  
  return jwt.sign({ uid, type }, process.env.JWT_SECRET, { expiresIn: '15d' });
}

export function jwt_decode(token: string): { uid: string, type: string } | null {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
    
    if (result.uid && result.type) {
      return { uid: result.uid, type: result.type };
    }
    return null;
  } catch (err) {
    return null;
  }
}