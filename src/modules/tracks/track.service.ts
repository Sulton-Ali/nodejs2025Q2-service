import { Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track | undefined {
    return this.tracks.find((item) => item.id === id);
  }

  create(dto: CreateTrackDto): Track {
    const track: Track = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.tracks.push(track);
    return track;
  }

  update(id: string, dto: UpdateTrackDto): Track | null {
    const index = this.tracks.findIndex((item) => item.id === id);
    if (index < 0) {
      return null;
    }
    const track = this.tracks[index];
    const updatedTrack: Track = {
      ...track,
      ...dto,
    };
    this.tracks[index] = updatedTrack;
    return updatedTrack;
  }

  delete(id: string): void {
    this.tracks = this.tracks.filter((item) => item.id !== id);
  }
}
