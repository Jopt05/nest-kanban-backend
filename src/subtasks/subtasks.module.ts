import { Module } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { SubtasksController } from './subtasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtask } from './entities/subtask.entity';

@Module({
  controllers: [SubtasksController],
  providers: [SubtasksService],
  imports: [TypeOrmModule.forFeature([Subtask])],
})
export class SubtasksModule {}
