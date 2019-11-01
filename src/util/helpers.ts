import * as bcrypt from 'bcrypt';

const earthRadius = 6371;

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPass = await bcrypt.hash(password + process.env.SALT, 10);
  return hashedPass;
};

export const comparePasswords = async (pass: string, hashedPass: string) => {
  return await bcrypt.compare(pass, hashedPass);
};

export const stringToDate = (date: string): Date => {
  if (!date) return new Date();
  const stringArray = date.split('-');
  const numberArray = stringArray.map(s => Number.parseInt(s));
  return new Date(numberArray[0], numberArray[1], numberArray[2]);
};

export const getDistance = (co1: number[], co2: number[]): number => {
  const [lat1, long1] = co1;
  const [lat2, long2] = co2;
  const distance =
    Math.acos(
      Math.sin((lat2 * Math.PI) / 180.0) * Math.sin((lat1 * Math.PI) / 180.0) +
        Math.cos((lat2 * Math.PI) / 180.0) *
          Math.cos((lat1 * Math.PI) / 180.0) *
          Math.cos(((long1 - long2) * Math.PI) / 180.0)
    ) * earthRadius;
  return distance;
};
