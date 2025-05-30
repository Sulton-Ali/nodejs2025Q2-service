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
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAll(): Artist[] {
    return this.artistService.findAll();
  }

  @Get(':id')
  getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Artist {
    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not founds`);
    }

    return artist;
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    const updatedArtist = this.artistService.update(id, dto);

    if (!updatedArtist) {
      throw new NotFoundException(`Artist with id ${id} not founds`);
    }

    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.artistService.delete(id);
    return;
  }
}
