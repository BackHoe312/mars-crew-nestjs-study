import * as bcrypt from 'bcrypt';

/**
 *
 * @param password
 * @returns 해쉬화된 패스워드
 * @description Generate Password
 */
export const generatePassword = async (password: string): Promise<string> => {
  const passwordSalts = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, passwordSalts);

  return hashPassword;
};

/**
 *
 * @param password
 * @param hashPassword
 * @returns if
 * @description Compare Password
 */
export const comparePassword = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};
