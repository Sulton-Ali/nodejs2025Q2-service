import { mapToUserDto } from './mappers/mapToDto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'generated/prisma';
import { User as UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Omit<UserEntity, 'password'>[]> {
    const users = await this.prismaService.user.findMany();
    return users.map(mapToUserDto);
  }

  async findOne(id: string): Promise<Omit<UserEntity, 'password'> | undefined> {
    const foundUser = await this.prismaService.user.findUnique({
      where: { id },
    });
    return mapToUserDto(foundUser);
  }

  async create(
    dto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password'> | undefined> {
    const createdUser = await this.prismaService.user.create({
      data: {
        ...dto,
        version: 1,
        id: crypto.randomUUID(),
      },
    });
    return mapToUserDto(createdUser);
  }

  async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<Omit<UserEntity, 'password'> | null> {
    const foundUser = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!foundUser) {
      return null;
    }

    if (foundUser.password !== dto.oldPassword) {
      throw new ForbiddenException('Password is incorrect');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        version: foundUser.version + 1,
        password: dto.newPassword,
      },
    });

    return mapToUserDto(updatedUser);
  }

  async delete(id: string): Promise<User | null> {
    const foundUser = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!foundUser) {
      return null;
    }

    await this.prismaService.user.delete({
      where: { id },
    });

    return foundUser;
  }
}
