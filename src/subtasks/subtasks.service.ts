import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtask } from './entities/subtask.entity';
import { CreateSubtaskDto } from './dtos/create-subtask.dto';
import { Task } from 'src/tasks/entities/task.entity';
import { UpdateSubtaskDto } from './dtos/update-subtask.dto';

@Injectable()
export class SubtasksService {

    constructor(
        @InjectRepository(Subtask) private readonly subtaskRepository: Repository<Subtask>
    ){

    }

    async findAll(taskId: string) {
        return this.subtaskRepository.find({
            where: {
                task: {
                    id: taskId
                }
            }
        })
    }

    async createSubtask(createSubtaskDto: CreateSubtaskDto, taskId: string) {
        try {
            const subtask = this.subtaskRepository.create({
                ...createSubtaskDto,
                task: {
                    id: taskId
                }
            });
            return this.subtaskRepository.save(subtask);
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException(error)
        }
    }

    async updateSubtask(id: string, updateSubtaskDto: UpdateSubtaskDto) {
        try {
            const subtask = await this.subtaskRepository.findOne({ where: { id } });
            if (!subtask) {
                throw new NotFoundException(`Subtask with ID ${id} not found`);
            }
            await this.subtaskRepository.update(id, updateSubtaskDto);
            return this.subtaskRepository.findOne({ where: { id } });
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException(error)
        }
    }

    async deleteSubtask(id: string) {
        try {
            const subtask = await this.subtaskRepository.findOne({ where: { id } });
            if (!subtask) {
                throw new NotFoundException(`Subtask with ID ${id} not found`);
            }
            return this.subtaskRepository.update(id, { deletedAt: new Date() });
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException(error)
        }
    }

}
