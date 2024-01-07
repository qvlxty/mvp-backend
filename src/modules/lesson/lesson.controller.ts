import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}
  @Get()
  getAllLessons() {
    return this.lessonService.getAllLessons();
  }

  @Get(':id')
  getLesson(@Param('id') id: number) {
    return this.lessonService.getLesson(id);
  }

  @Post()
  async createLesson(@Body() lesson: Lesson) {
    await this.lessonService.createLesson(lesson);
    return 'Lesson created';
  }

  @Put(':id')
  async updateLesson(@Param('id') id: number, @Body() lesson: Lesson) {
    await this.lessonService.updateLesson(id, lesson);
    return 'Lesson updated';
  }

  @Delete(':id')
  async deleteLesson(@Param('id') id: number) {
    await this.lessonService.deleteLesson(id);
    return 'Lesson deleted';
  }
}
