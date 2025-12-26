import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSubtaskDto } from './dtos/create-subtask.dto';
import { UpdateSubtaskDto } from './dtos/update-subtask.dto';

@Controller('tasks/:taskId/subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Get()
  @UseGuards( AuthGuard('jwt') )
  findAll(@Param('taskId', new ParseUUIDPipe({ version: '4' })) taskId: string) {
    return this.subtasksService.findAll(taskId);
  }

  @Post()
  @UseGuards( AuthGuard('jwt') )
  create(@Param('taskId', new ParseUUIDPipe({ version: '4' })) taskId: string, @Body() createSubtaskDto: CreateSubtaskDto) {
    return this.subtasksService.createSubtask(createSubtaskDto, taskId);
  }

  @Put('/:id')
  @UseGuards( AuthGuard('jwt') )
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateSubtaskDto: UpdateSubtaskDto) {
    return this.subtasksService.updateSubtask(id, updateSubtaskDto);
  }

  @Delete('/:id')
  @UseGuards( AuthGuard('jwt') )
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.subtasksService.deleteSubtask(id);
  }
}
