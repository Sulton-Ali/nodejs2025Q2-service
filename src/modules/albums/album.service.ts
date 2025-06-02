import { Injectable } from '@nestjs/common';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { TrackService } from '../tracks/track.service';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  constructor(private readonly trackService: TrackService) {}

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album | undefined {
    return this.albums.find((item) => item.id === id);
  }

  create(dto: CreateAlbumDto): Album {
    const album: Album = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.albums.push(album);
    return album;
  }

  update(id: string, dto: UpdateAlbumDto): Album | null {
    const index = this.albums.findIndex((item) => item.id === id);
    if (index < 0) {
      return null;
    }
    const album = this.albums[index];
    const updatedAlbum: Album = {
      ...album,
      ...dto,
    };
    this.albums[index] = updatedAlbum;
    return updatedAlbum;
  }

  delete(id: string) {
    const index = this.albums.findIndex((item) => item.id === id);

    if (index < 0) {
      return null;
    }

    this.trackService.removeAlbum(id);

    return this.albums.splice(index, 1)[0];
  }

  removeArtist(artistId: string) {
    this.albums = this.albums.map((item) => {
      if (item.artistId === artistId) {
        return {
          ...item,
          artistId: null,
        };
      }

      return item;
    });
  }
}
