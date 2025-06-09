import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { Track } from 'generated/prisma';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateTrackDto): Promise<Track> {
    return await this.trackService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateTrackDto,
  ): Promise<Track | null> {
    const updatedTrack = await this.trackService.update(id, dto);
    if (!updatedTrack) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const deletedTrack = await this.trackService.delete(id);

    if (!deletedTrack) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return;
  }
}
