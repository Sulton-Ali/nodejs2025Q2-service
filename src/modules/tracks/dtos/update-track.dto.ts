import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  artistId?: string | null;

  @IsString()
  @IsOptional()
  albumId?: string | null;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  duration?: number;
}
