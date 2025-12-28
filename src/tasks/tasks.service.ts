import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>
    ){}

    async findAll(user: User, boardId: string) {
        return this.taskRepository.find({
            relations: {
                user: true,
                subtasks: true
            },
            where: {
                user: {
                    id: user.id
                },
                board: {
                    id: boardId
                }
            }
        })
    }

    async createTask( createTaskDto: CreateTaskDto, user: User, boardId: string ) {
        try {
            const task = this.taskRepository.create({
            ...createTaskDto,
            user,
            board: {
                id: boardId
            }
        })
        return this.taskRepository.save(task)
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException()
        }
    }

    async updateTask( updateTaskDto: UpdateTaskDto, id: string ){
        try {
            const task = await this.taskRepository.findOneBy({ id })
            if(!task){
                throw new NotFoundException(`Task with ID ${id} not found`)
            }
            
            await this.taskRepository.update(id, updateTaskDto)
            return this.taskRepository.findOneBy({ id })
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException()
        }
    }

    async deleteTask(id: string){
        try {
            const task = await this.taskRepository.findOneBy({ id })
            if(!task){
                throw new NotFoundException(`Task with ID ${id} not found`)
            }
            
            return await this.taskRepository.update(id, { deletedAt: new Date() })
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException()
        }
    }

}
