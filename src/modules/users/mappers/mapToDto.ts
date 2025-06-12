import { User } from 'generated/prisma';
import { User as UserEntity } from '../entities/user.entity';

export const mapToUserDto = (entity?: User): Omit<UserEntity, 'password'> => {
  console.log('Mapping User entity to DTO:', entity);

  return entity
    ? {
        id: entity.id,
        login: entity.login,
        version: entity.version,
        createdAt: entity.createdAt.getTime(),
        updatedAt: entity.updatedAt.getTime(),
      }
    : undefined;
};
