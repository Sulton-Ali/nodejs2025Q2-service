import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorite')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favoritesService.addArtist(id);
    return;
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favoritesService.addAlbum(id);
    return;
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favoritesService.addTrack(id);
    return;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favoritesService.removeArtist(id);
    return;
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favoritesService.removeAlbum(id);
    return;
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favoritesService.removeTrack(id);
    return;
  }
}
