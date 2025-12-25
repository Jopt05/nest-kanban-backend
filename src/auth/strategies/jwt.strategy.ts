import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-jwt";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository( User ) private readonly userRepository: Repository<User>,
        _configService: ConfigService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.get<string>( 'JWT_SECRET' )!,
        });
    }

    async validate( payload: { id: string } ): Promise<User> {
        const { id } = payload;

        const user = await this.userRepository.findOneBy({id});

        if( !user ) throw new UnauthorizedException('User does not exist');

        return user;

    }
}