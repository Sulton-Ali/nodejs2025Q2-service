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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { Album } from 'generated/prisma';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateAlbumDto): Promise<Album> {
    return await this.albumService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateAlbumDto,
  ): Promise<Album | null> {
    const updatedAlbum = await this.albumService.update(id, dto);
    if (!updatedAlbum) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const deletedAlbum = await this.albumService.delete(id);

    if (!deletedAlbum) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return;
  }
}
