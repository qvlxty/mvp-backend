import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
  })
  text: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;

  @CreateDateColumn({
    name: 'updated_at',
  })
  updatedAt: string;
}
