import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  artistId?: string | null;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  year?: number;
}
