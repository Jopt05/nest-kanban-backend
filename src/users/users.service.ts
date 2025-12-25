import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository( User ) private readonly userRepository: Repository<User>
    ){}

    async createUser( createUserDto: CreateUserDto ) {
        try {
            const { password, ...rest } = createUserDto;
            const user = this.userRepository.create({
                ...rest,
                password: await bcrypt.hash(password, 10)
            })
            await this.userRepository.save( user );
            return user;  
        } catch (error) {
            console.error( error )
            throw new InternalServerErrorException()
        }
    }
}
