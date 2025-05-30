import { Injectable } from '@nestjs/common';
import { Favorites } from './entities/favorites.entity';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = { artists: [], albums: [], tracks: [] };

  getAll(): Favorites {
    return this.favorites;
  }

  addArtist(id: string) {
    if (!this.favorites.artists.includes(id)) {
      this.favorites.artists.push(id);
    }
  }

  addAlbum(id: string) {
    if (!this.favorites.albums.includes(id)) {
      this.favorites.albums.push(id);
    }
  }

  addTrack(id: string) {
    if (!this.favorites.tracks.includes(id)) {
      this.favorites.tracks.push(id);
    }
  }

  removeArtist(id: string) {
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }

  removeAlbum(id: string) {
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  removeTrack(id: string) {
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }
}
