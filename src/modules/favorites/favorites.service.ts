import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Favorites } from './entities/favorites.entity';
import { ArtistService } from '../artists/artist.service';
import { AlbumService } from '../albums/album.service';
import { TrackService } from '../tracks/track.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = { artists: [], albums: [], tracks: [] };

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  getAll() {
    const artists = this.artistService.findAllIn(this.favorites.artists);
    const albums = this.albumService.findAllIn(this.favorites.albums);
    const tracks = this.trackService.findAllIn(this.favorites.tracks);
    const favorites = {
      artists,
      albums,
      tracks,
    };
    return favorites;
  }

  addArtist(id: string) {
    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    if (!this.favorites.artists.includes(id)) {
      this.favorites.artists.push(id);
    }
  }

  addAlbum(id: string) {
    const album = this.albumService.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException();
    }

    if (!this.favorites.albums.includes(id)) {
      this.favorites.albums.push(id);
    }
  }

  addTrack(id: string) {
    const track = this.trackService.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException();
    }

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
