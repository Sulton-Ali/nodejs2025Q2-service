import { mapToUserDto } from './mappers/mapToDto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  findAll(): Omit<User, 'password'>[] {
    return this.users.map(mapToUserDto);
  }

  findOne(id: string): Omit<User, 'password'> | undefined {
    const foundUser = this.users.find((item) => item.id === id);
    return mapToUserDto(foundUser);
  }

  create(dto: CreateUserDto) {
    const now = Date.now();
    const user: User = {
      id: crypto.randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.users.push(user);
    return mapToUserDto(user);
  }

  update(id: string, dto: UpdateUserDto) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index < 0) {
      return null;
    }

    if (!this.verifyPassword(id, dto.oldPassword)) {
      throw new ForbiddenException();
    }

    const user = this.users[index];
    const updatedUser: User = {
      ...user,
      password: dto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    this.users[index] = updatedUser;
    return mapToUserDto(updatedUser);
  }

  delete(id: string) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index < 0) {
      return null;
    }

    return this.users.splice(index, 1)[0];
  }

  verifyPassword(userId: string, password: string) {
    const foundUser = this.users.find((item) => item.id === userId);

    return foundUser.password === password;
  }
}
