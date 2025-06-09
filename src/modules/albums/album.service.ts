import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Album } from 'generated/prisma';

@Injectable()
export class AlbumService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Album[]> {
    return await this.prismaService.album.findMany();
  }

  async findAllIn(list: string[]): Promise<Album[]> {
    return await this.prismaService.album.findMany({
      where: {
        id: {
          in: list,
        },
      },
    });
  }

  async findOne(id: string): Promise<Album | null> {
    return await this.prismaService.album.findUnique({
      where: { id },
    });
  }

  async create(dto: CreateAlbumDto): Promise<Album> {
    const album = {
      ...dto,
      id: crypto.randomUUID(),
    };
    return await this.prismaService.album.create({ data: album });
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album | null> {
    const foundAlbum = await this.findOne(id);
    if (!foundAlbum) {
      return null;
    }

    const updatedAlbum = {
      ...foundAlbum,
      ...dto,
      id: foundAlbum.id,
    };
    return await this.prismaService.album.update({
      where: { id: foundAlbum.id },
      data: updatedAlbum,
    });
  }

  async delete(id: string): Promise<Album | null> {
    const foundAlbum = await this.findOne(id);
    if (!foundAlbum) {
      return null;
    }

    return await this.prismaService.album.delete({
      where: { id: foundAlbum.id },
    });
  }
}
