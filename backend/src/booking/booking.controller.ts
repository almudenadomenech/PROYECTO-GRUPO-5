import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.model';
import { Repository } from 'typeorm';


@Controller('booking')
export class BookingController {

    constructor(
        @InjectRepository(Booking)
        private bookingRepo: Repository<Booking>
    ) {}

    @Get()
    findAll() {
        return this.bookingRepo.find();
    }

    @Get('filter-by-id/:id') // :id es una variable, parámetro en la url
    findById( @Param('id', ParseIntPipe) id: number ) {
        return this.bookingRepo.findOne({
            where: {
                id: id
            }
        });
    }

         //http://localhost:3000/booking/filter-by-user/2
        @Get('filter-by-user/:id')
        findByUserId(@Param('id', ParseIntPipe) id: number){
            return this.bookingRepo.find({
                where: {
                    user: {
                        id: id
                    }
                }
            });
        }

        @Post()
        create(@Body() booking: Booking) {
            return this.bookingRepo.save(booking);
        }
        
}
