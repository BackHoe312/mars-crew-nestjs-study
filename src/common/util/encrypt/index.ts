import * as bcrypt from 'bcrypt';

/**
 * @description Generate Hash Password
 */
export const generatePassword = async (password: string): Promise<string> => {
  const passwordSalts = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, passwordSalts);

  return hashPassword;
};

/**
 * @description Compare Password
 */
export const comparePassword = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

/**
 * @description Hash Refresh Token
 */
export const generateHashRefreshToken = async (
  refreshToken: string,
): Promise<string> => {
  const refreshTokenSalts = await bcrypt.genSalt(10);
  return await bcrypt.hash(refreshToken, refreshTokenSalts);
};

/**
 * @description Compare Refresh Token
 */
export const compareRefreshToken = async (
  refreshToken: string,
  hashedRefreshToken: string,
): Promise<boolean> => {
  return await bcrypt.compare(refreshToken, hashedRefreshToken);
};
