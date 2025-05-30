import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumService {
  private albums: any[] = [];

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    return this.albums.find((item) => item.id === id);
  }

  create(dto: any) {
    const album = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.albums.push(album);
    return album;
  }

  update(id: string, dto: any) {
    const index = this.albums.findIndex((item) => item.id === id);
    if (index < 0) {
      return null;
    }
    const newAlbum = Object.assign(this.albums[index], dto);
    this.albums.splice(index, 1, newAlbum);
    return newAlbum;
  }

  delete(id: string) {
    this.albums = this.albums.filter((item) => item.id !== id);
  }
}
