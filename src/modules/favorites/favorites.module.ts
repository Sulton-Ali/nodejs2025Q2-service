import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { AlbumModule } from '../albums/album.module';
import { TrackModule } from '../tracks/track.module';
import { ArtistModule } from '../artists/artist.module';

@Module({
  imports: [AlbumModule, ArtistModule, TrackModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
