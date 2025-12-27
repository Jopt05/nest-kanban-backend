import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { getUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateBoardDto } from './dtos/create-board.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  @UseGuards( AuthGuard('jwt') )
  findAll( @getUser() user: User ) {
    return this.boardsService.findAll(user)
  }

  @Post()
  @UseGuards( AuthGuard('jwt') )
  create( @Body() createBoardDto: CreateBoardDto, @getUser() user: User ) {
    return this.boardsService.createBoard(createBoardDto, user)
  }

  @Put(':id')
  @UseGuards( AuthGuard('jwt') )
  update( 
    @Param('id', new ParseUUIDPipe({version: '4'})) id: string, 
    @Body() updateBoardDto: CreateBoardDto 
  ) {
    return this.boardsService.updateBoard(id, updateBoardDto)
  }

  @Delete(':id')
  @UseGuards( AuthGuard('jwt') )
  delete( @Param('id', new ParseUUIDPipe({version: '4'})) id: string ) {
    return this.boardsService.deleteBoard(id)
  }
}
