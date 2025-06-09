import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    const favorites = await this.prismaService.favorite.findFirst();

    if (!favorites) {
      const result = await this.prismaService.favorite.create({
        data: {
          artists: [],
          albums: [],
          tracks: [],
        },
      });

      return {
        artists: result.artists,
        albums: result.albums,
        tracks: result.tracks,
      };
    }

    const [artists, albums, tracks] = await Promise.all([
      this.prismaService.artist.findMany({
        where: {
          id: {
            in: favorites.artists,
          },
        },
      }),
      this.prismaService.album.findMany({
        where: {
          id: {
            in: favorites.albums,
          },
        },
      }),
      this.prismaService.track.findMany({
        where: {
          id: {
            in: favorites.tracks,
          },
        },
      }),
    ]);
    return {
      artists,
      albums,
      tracks,
    };
  }

  async addArtist(id: string) {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    const favorite = await this.prismaService.favorite.findFirst();

    await this.prismaService.favorite.update({
      where: { id: favorite.id },
      data: {
        artists: {
          set: [...favorite.artists, id],
        },
      },
    });

    return artist;
  }

  async addAlbum(id: string) {
    const album = await this.prismaService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new UnprocessableEntityException();
    }

    const favorite = await this.prismaService.favorite.findFirst();

    await this.prismaService.favorite.update({
      where: { id: favorite.id },
      data: {
        albums: {
          set: [...favorite.albums, id],
        },
      },
    });

    return album;
  }

  async addTrack(id: string) {
    const track = await this.prismaService.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new UnprocessableEntityException();
    }

    const favorite = await this.prismaService.favorite.findFirst();

    await this.prismaService.favorite.update({
      where: { id: favorite.id },
      data: {
        tracks: {
          set: [...favorite.tracks, id],
        },
      },
    });

    return track;
  }

  async removeArtist(id: string) {
    const favorite = await this.prismaService.favorite.findFirst();
    await this.prismaService.favorite.update({
      where: { id: favorite.id },
      data: {
        artists: {
          set: favorite.artists.filter((artistId) => artistId !== id),
        },
      },
    });
  }

  async removeAlbum(id: string) {
    const favorite = await this.prismaService.favorite.findFirst();
    await this.prismaService.favorite.update({
      where: { id: favorite.id },
      data: {
        albums: {
          set: favorite.albums.filter((albumId) => albumId !== id),
        },
      },
    });
  }

  async removeTrack(id: string) {
    const favorite = await this.prismaService.favorite.findFirst();
    await this.prismaService.favorite.update({
      where: { id: favorite.id },
      data: {
        tracks: {
          set: favorite.tracks.filter((trackId) => trackId !== id),
        },
      },
    });
  }
}
