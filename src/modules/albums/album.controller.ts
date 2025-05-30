import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: any) {
    return this.albumService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: any,
  ) {
    const updatedAlbum = this.albumService.update(id, dto);
    if (!updatedAlbum) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.albumService.delete(id);
    return;
  }
}
