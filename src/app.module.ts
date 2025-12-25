import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import { JoiValidationSchema } from './config/joi.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';


@Module( {
    imports: [
      ConfigModule.forRoot({
        validationSchema: JoiValidationSchema
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
        ssl: true
      }),

      UsersModule,
      AuthModule,
      TasksModule,
      BoardsModule
    ],
    controllers: [],
    providers: [],
    exports: []
} )
export class AppModule { }