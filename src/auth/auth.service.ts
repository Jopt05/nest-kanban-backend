import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository( User ) private readonly userRepository: Repository<User>,
    ){}

    async login( loginDto: LoginDto ) {
        const { email, password } = loginDto;
        const user = await this.userRepository.findOneBy({ email });
        if ( !user ) {
            throw new UnauthorizedException('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if ( !isMatch ) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return {
            user,
            token: this.jwtService.sign({ id: user.id })
        };
    }

}
