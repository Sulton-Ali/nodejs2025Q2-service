import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  findAll(): Omit<User, 'password'>[] {
    return this.users.map((item) => ({
      id: item.id,
      login: item.login,
      version: item.version,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }

  findOne(id: string): Omit<User, 'password'> | undefined {
    const foundUser = this.users.find((item) => item.id === id);
    return foundUser
      ? {
          id: foundUser.id,
          login: foundUser.login,
          version: foundUser.version,
          createdAt: foundUser.createdAt,
          updatedAt: foundUser.updatedAt,
        }
      : undefined;
  }

  create(dto: CreateUserDto): User {
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
    return user;
  }

  update(id: string, dto: UpdateUserDto): User | null {
    const index = this.users.findIndex((item) => item.id === id);
    if (index < 0) {
      return null;
    }
    const user = this.users[index];
    const updatedUser: User = {
      ...user,
      ...dto,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  delete(id: string): void {
    this.users = this.users.filter((item) => item.id !== id);
  }
}
