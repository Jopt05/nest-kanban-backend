import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dtos/create-board.dto';
import { User } from 'src/users/entities/user.entity';
import { create } from 'domain';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>
    ) {}

    async findAll(user: User) {
        return this.boardRepository.find({
            relations: {
                user: true
            },
            where: {
                user: {
                    id: user.id
                }
            }
        })
    }

    async createBoard( createBoardDto: CreateBoardDto, user: User ) {
        try {
            const board = this.boardRepository.create({
                ...createBoardDto,
                user
            });
            return this.boardRepository.save(board)
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException()
        }
    }

    async updateBoard( id: string, updateBoardDto: CreateBoardDto ) {
        try {
            const board = await this.boardRepository.findOneBy({id});
            if( !board ) {
                throw new NotFoundException('Board not found')
            }

            await this.boardRepository.update(id, updateBoardDto);
            return this.boardRepository.findOneBy({id})
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException()
        }
    }

    async deleteBoard(id: string) {
        try {
            const board = await this.boardRepository.findOneBy({id});
            if( !board ) {
                throw new NotFoundException('Board not found')
            }

            return this.boardRepository.update(id, {deletedAt: new Date()})
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException()
        }
    }
}
