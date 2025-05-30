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
  getAll(): Omit<User, 'password'>[] {
    return this.userService.findAll();
  }

  @Get(':id')
  getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Omit<User, 'password'> {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    const updatedUser = this.userService.update(id, dto);
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.userService.delete(id);
    return;
  }
}
