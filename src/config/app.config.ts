import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  crypt_salt: parseInt(process.env.CRYPT_SALT, 10) || 10,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_secret_refresh_key: process.env.JWT_SECRET_REFRESH_KEY,
  token_expire_time: process.env.TOKEN_EXPIRE_TIME,
  token_resfresh_expire_time: process.env.TOKEN_REFRESH_EXPIRE_TIME,
}));
