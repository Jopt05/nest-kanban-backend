import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { getUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UseGuards( AuthGuard('jwt') )
  async findAll(
    @getUser() user: User, 
    @Param('boardId', new ParseUUIDPipe({version: '4'})) boardId: string
  ) {
    return this.tasksService.findAll(user, boardId);
  }

  @Post()
  @UseGuards( AuthGuard('jwt') )
  async create( 
    @Body() createTaskDto: CreateTaskDto, 
    @getUser() user: User,
    @Param('boardId', new ParseUUIDPipe({version: '4'})) boardId: string
  ) {
    return this.tasksService.createTask( createTaskDto, user, boardId );
  }

  @Put('/:id')
  @UseGuards( AuthGuard('jwt') )
  async update( 
    @Param('id', new ParseUUIDPipe({version: '4'})) id: string, 
    @Body() updateTaskDto: UpdateTaskDto 
  ) {
    return this.tasksService.updateTask( updateTaskDto, id );
  }

  @Delete('/:id')
  @UseGuards( AuthGuard('jwt') )
  async delete( @Param('id', new ParseUUIDPipe({version: '4'})) id: string ) {
    return this.tasksService.deleteTask( id );
  }
  
}
