import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository( User ) private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
    ){}

    async createUser( createUserDto: CreateUserDto ) {
        try {
            const { password, ...rest } = createUserDto;
            const user = this.userRepository.create({
                ...rest,
                password: await bcrypt.hash(password, 10)
            })
            await this.userRepository.save( user )
            const token = this.jwtService.sign({ id: user.id })
            return { user, token };  
        } catch (error) {
            console.error( error )
            throw new InternalServerErrorException()
        }
    }
}
