import * as db from '#lib/db.ts';
import * as auth from '#lib/auth.ts';

function get_user_type(cookies): string|null
{
  const session_token = cookies['session_token'];
  
  if (session_token)
  {
    const data = auth.jwt_decode(session_token);
    if (data?.type) return data.type;
  }
  
  return null;
}

export async function admin_only(req, res, next)
{
  const type = get_user_type(req.cookies);
  
  if (type === 'admin')
    next();
  else
    res.sendStatus(403);
}

export async function faculty_only(req, res, next)
{
  const type = get_user_type(req.cookies);
  
  if (type === 'faculty' || type === 'admin')
    next();
  else
    res.sendStatus(403);
}

export async function student_only(req: any, res: any, next: any) {
  const token = req.cookies.session_token;
  const user = await db.get_user_from_token(token);
  
  if (!user || (user.type && user.type.toLowerCase() !== 'student')) {
    console.log('student_only middleware: Forbidden, user type:', user?.type);
    return res.status(403).json({ error: 'Students only' });
  }
  
  req.user = user;
  next();
}
