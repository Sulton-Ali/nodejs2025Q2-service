import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Artist } from 'generated/prisma';

@Injectable()
export class ArtistService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    return await this.prismaService.artist.findMany();
  }

  async findAllIn(list: string[]): Promise<Artist[]> {
    return await this.prismaService.artist.findMany({
      where: {
        id: {
          in: list,
        },
      },
    });
  }

  async findOne(id: string): Promise<Artist | null> {
    return await this.prismaService.artist.findUnique({
      where: { id },
    });
  }

  async create(dto: CreateArtistDto): Promise<Artist> {
    const artist = {
      ...dto,
      id: crypto.randomUUID(),
    };
    const newArtist = await this.prismaService.artist.create({ data: artist });
    return newArtist;
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist | null> {
    const foundArtist = await this.findOne(id);
    if (!foundArtist) {
      return null;
    }

    const newArtist = {
      ...foundArtist,
      ...dto,
      id: foundArtist.id,
    };
    const result = await this.prismaService.artist.update({
      where: { id: foundArtist.id },
      data: newArtist,
    });
    return result;
  }

  async delete(id: string): Promise<Artist | null> {
    const foundArtist = await this.findOne(id);
    if (!foundArtist) {
      return null;
    }

    const result = await this.prismaService.artist.delete({
      where: { id },
    });

    return result;
  }
}
