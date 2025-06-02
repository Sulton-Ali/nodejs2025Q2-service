export interface Album {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  year: number;
}
