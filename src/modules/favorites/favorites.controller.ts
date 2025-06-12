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

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAll() {
    return await this.favoritesService.getAll();
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.addArtist(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.favoritesService.addAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.favoritesService.addTrack(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.favoritesService.removeArtist(id);
    return;
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.favoritesService.removeAlbum(id);
    return;
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.favoritesService.removeTrack(id);
    return;
  }
}
