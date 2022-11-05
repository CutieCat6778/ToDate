import * as crypto from 'crypto';

interface PasswordResponse {
  salt: string;
  hash: string;
}

export function HashPassword(password): PasswordResponse {
  const salt = crypto.randomBytes(16).toString('hex');

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return { salt, hash };
}

export function ValidatePassword(password, salt, hashedPassword): boolean {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return hashedPassword === hash;
}
