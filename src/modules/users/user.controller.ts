import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<Omit<User, 'password'>[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<User, 'password'> | undefined> {
    const updatedUser = await this.userService.update(id, dto);
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const deletedUser = await this.userService.delete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
