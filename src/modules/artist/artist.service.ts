import { Injectable } from '@nestjs/common';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist | undefined {
    return this.artists.find((item) => item.id === id);
  }

  create(artist: Artist): Artist {
    this.artists.push(artist);
    return artist;
  }
}
