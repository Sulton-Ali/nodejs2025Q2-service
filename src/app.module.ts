import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ArtistModule } from './modules/artists/artist.module';
import { UserModule } from './modules/users/user.module';
import { TrackModule } from './modules/tracks/track.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { AlbumModule } from './modules/albums/album.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { PrismaModule } from './modules/prisma/prisma.module';

import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [appConfig],
    }),
    PrismaModule,
    UserModule,
    ArtistModule,
    TrackModule,
    FavoritesModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
