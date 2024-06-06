import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Request, ParseIntPipe, Post, Put, UseGuards, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.model';
import { Repository } from 'typeorm';
import { Role } from 'src/users/role.model';
import { AuthGuard } from '@nestjs/passport';


@Controller('booking')
export class BookingController {

    constructor(
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>
    ){}

    @Get()
    findAll(){
        return this.bookingRepository.find();
    }


    @Get('filter-by-id/:id')
    findById(@Param('id', ParseIntPipe) id :number){
        return this.bookingRepository.findOne({
            where: {
                id: id
            }
        });
    } 
    @Get('filter-by-user/:id')
    findByUserId(@Param('id', ParseIntPipe) id: number){
        return this.bookingRepository.find({
            where: {
                user: {
                    id: id
                }
            }
        });
    }
    
    @Get('filter-by-house/:id')
    findByHouseId(@Param('id', ParseIntPipe) id: number){
        return this.bookingRepository.find({
            where: {
                user: {
                    id: id
                }
            }
        });
    }  

 
    @UseGuards(AuthGuard('jwt'))
    @Get('filter-by-current-user')
    findByCurrentUserId(@Request() request) {

        if (request.user.role === Role.ADMIN) {
            return this.bookingRepository.find();
        } else {
            return this.bookingRepository.find({
                where: {
                    user: {
                        id: request.user.id
                    }
                }
            });
        }

    }    

 
/*     @Get(':id')
    //@UseGuards(AuthGuard('jwt'))
    findById(@Param('id', ParseIntPipe) id: number) {
       return this.bookingRepository.findOne({
            where: {
               id: id
                }
            });
        
}  */

@Get('filter-by-house/:id')
findByBookId(@Param('id', ParseIntPipe) id: number){
    return this.bookingRepository.find({
        where: {
            house: {
                id: id
            }
        }
    });
}
@Get('filter')
findWithFilter(@Query() filters: any) {
    console.log(filters);

    return this.bookingRepository.find({
        where: filters
    });
}
    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() booking: Booking, @Request() request) {
        
        booking.user = request.user;
        return this.bookingRepository.save(booking);
                
    }

    
    @Delete(':id')
    async deleteById(
    @Param('id', ParseIntPipe) id: number
    ) {
    const exists = await this.bookingRepository.existsBy({ id: id });

    if (!exists) {
        throw new NotFoundException('Booking not found');
    }

    try {
        await this.bookingRepository.delete(id);
    } catch (error) {
        console.log("Error al borrar la reserva", error);
        throw new ConflictException('No se puede borrar.');
    }
}

}



