import { Injectable } from '@nestjs/common';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { AlbumService } from '../albums/album.service';
import { TrackService } from '../tracks/track.service';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist | undefined {
    return this.artists.find((item) => item.id === id);
  }

  create(dto: CreateArtistDto): Artist {
    const artist = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.artists.push(artist);
    return artist;
  }

  update(id: string, dto: UpdateArtistDto) {
    const index = this.artists.findIndex((item) => item.id === id);
    if (index < 0) {
      return null;
    }

    const newArtist = Object.assign(this.artists[index], dto);
    this.artists.splice(index, 1, newArtist);
    return newArtist;
  }

  delete(id: string) {
    const index = this.artists.findIndex((item) => item.id === id);

    if (index < 0) {
      return null;
    }

    this.albumService.removeArtist(id);
    this.trackService.removeArtist(id);

    return this.artists.splice(index, 1)[0];
  }
}
