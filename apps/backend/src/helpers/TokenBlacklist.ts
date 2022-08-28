import fs from 'fs';
import path from 'path';

export const blacklist = async (token: string): Promise<any> => {
  const pathForBlacklist = await getBlacklistFilePath();
  fs.appendFileSync(pathForBlacklist, token + '\n');
};

export const isBlacklisted = async (token: string): Promise<boolean> => {
  const pathForBlacklist = await getBlacklistFilePath();
  const blacklist = fs.readFileSync(pathForBlacklist, 'utf8');
  return blacklist.includes(token);
};

const getBlacklistFilePath = async (): Promise<string> => {
  return path.join(__dirname, '../../blacklist.txt');
};
