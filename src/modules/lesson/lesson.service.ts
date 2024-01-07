import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  public createLesson(lesson: Lesson) {
    return this.lessonRepository.save(lesson);
  }

  public getLesson(lessonId: number) {
    return this.lessonRepository.findOneBy({
      id: lessonId,
    });
  }

  public getAllLessons() {
    return this.lessonRepository.find({
      select: ['id', 'name', 'createdAt', 'updatedAt'],
    });
  }

  public updateLesson(lessonId: number, lesson: Lesson) {
    return this.lessonRepository.update(lessonId, lesson);
  }

  public deleteLesson(lessonId: number) {
    return this.lessonRepository.delete(lessonId);
  }
}
