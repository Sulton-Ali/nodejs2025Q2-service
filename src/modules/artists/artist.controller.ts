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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { Artist } from 'generated/prisma';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAll() {
    console.log('Fetching all artists!');

    return await this.artistService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not founds`);
    }

    return artist;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateArtistDto) {
    return await this.artistService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateArtistDto,
  ): Promise<Artist | null> {
    const updatedArtist = await this.artistService.update(id, dto);

    if (!updatedArtist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const deletedArtist = await this.artistService.delete(id);
    if (!deletedArtist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return;
  }
}
