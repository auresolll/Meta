import * as bcrypt from 'bcrypt';

export const generatorHashPassword = async (
  password: string,
): Promise<{
  password: string;
  hash: string;
  salt: string;
}> => {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  const salt = await bcrypt.genSalt();
  return {
    password,
    hash,
    salt,
  };
};

export const compareHashPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
