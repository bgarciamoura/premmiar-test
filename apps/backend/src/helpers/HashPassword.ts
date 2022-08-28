import * as bcrypt from 'bcrypt';

export const hashSync = (
  password: string,
  saltRounds: number
): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export const compareHash = (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
