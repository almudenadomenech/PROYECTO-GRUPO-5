import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingController } from './booking/booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.model';
import { Booking } from './booking/booking.model';
import { House } from './houses/houses.model';
import { HousesController } from './houses/houses.controller';
import { UsersController } from './users/users.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { RatingController } from './rating/rating.controller';
import { Rating } from './rating/rating.model';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtValidator } from './users/jwt.validators';



@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'admin',
      signOptions: {expiresIn: '7d'}
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        
        filename: (req, file, callback) => {
          let fileName = uuidv4() + extname(file.originalname);
          callback(null, fileName);
        }
      })
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'backend',
      entities: [User, Booking, House, Rating],
      synchronize: true, 
      logging: true
    }),
    TypeOrmModule.forFeature([Booking, User, House, Rating])
  ],
  controllers: [HousesController, BookingController, UsersController, RatingController],
  providers: [JwtValidator],
})
export class AppModule {}