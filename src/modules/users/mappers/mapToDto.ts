import { User } from '../entities/user.entity';

export const mapToUserDto = (entity?: User): Omit<User, 'password'> => {
  return entity
    ? {
        id: entity.id,
        login: entity.login,
        version: entity.version,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      }
    : undefined;
};
