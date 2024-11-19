import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post()
  create(@Body() createFavoriteDto: { postId: number }) {
    return this.favoritesService.create(createFavoriteDto.postId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }
}