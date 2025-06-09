import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Track } from 'generated/prisma';

@Injectable()
export class TrackService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Track[]> {
    return await this.prismaService.track.findMany();
  }

  async findAllIn(list: string[]): Promise<Track[]> {
    return await this.prismaService.track.findMany({
      where: {
        id: {
          in: list,
        },
      },
    });
  }

  async findOne(id: string): Promise<Track | null> {
    return await this.prismaService.track.findUnique({
      where: { id },
    });
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    const track = {
      ...dto,
      id: crypto.randomUUID(),
    };
    return await this.prismaService.track.create({ data: track });
  }

  async update(id: string, dto: UpdateTrackDto): Promise<Track | null> {
    const foundTrack = await this.findOne(id);
    if (!foundTrack) {
      return null;
    }

    const updatedTrack = {
      ...foundTrack,
      ...dto,
      id: foundTrack.id,
    };
    return await this.prismaService.track.update({
      where: { id: foundTrack.id },
      data: updatedTrack,
    });
  }

  async delete(id: string): Promise<Track | null> {
    const foundTrack = await this.findOne(id);
    if (!foundTrack) {
      return null;
    }

    return await this.prismaService.track.delete({
      where: { id: foundTrack.id },
    });
  }
}
