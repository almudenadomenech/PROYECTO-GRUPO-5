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
import { Rating } from './rating/rating.model';
import { RatingController } from './rating/rating.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'backend', // crear esta base de datos en MySQL primero
      entities: [Booking, User, House, Rating],
      synchronize: true, 
      logging: true
    }),
    TypeOrmModule.forFeature([Booking, User, House, Rating])
  ],
  controllers: [BookingController, AppController, HousesController, UsersController, RatingController],
  providers: [AppService],
})
export class AppModule {}
