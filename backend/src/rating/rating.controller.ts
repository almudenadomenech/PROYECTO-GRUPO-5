import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './rating.model';
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';


@Controller('rating')
export class RatingController {

    constructor(
        @InjectRepository(Rating)
        private ratingRepository: Repository<Rating>
    ) {}

    @Get()
    findAll() {
        return this.ratingRepository.find()
    }

    @Get(':id') 
    findById( @Param('id', ParseIntPipe) id: number ) {
        return this.ratingRepository.findOne({
            where: {
                id: id
            }
        });
    }

    @Get('filter-by-user/:id')
   
    findByUserId(@Param('id', ParseIntPipe) id: number){
        return this.ratingRepository.find({
            where: {
                user: {
                    id: id
                }
            }
        });
    }

    
    @Get('filter-by-house/:id')
    findByHouseId(@Param('id', ParseIntPipe) id: number){
        return this.ratingRepository.find({
            where: {
                house: {
                    id: id
                }
            }, 
            order: {
                createdDate: "DESC"
            }
        });
    }
/* 
    @UseGuards(AuthGuard('jwt'))
    @Get('filter-by-current-user')
    findByCurrentUserId(@Request() request) {

        if (request.user.role === Role.ADMIN) {
            return this.ratingRepository.find();
        } else {
            return this.ratingRepository.find({
                where: {
                    user: {
                        id: request.user.id
                    }
                }
            });
        }

    }  */   
     

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() rating: Rating, @Request() request) {
        
        rating.user = request.user;
        return this.ratingRepository.save(rating);      
    }

    
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() rating: Rating
        ) {
            // await espera a que el método existsBy termine ya que devuelve Promise<boolean>
            const exists = await this.ratingRepository.existsBy({
               id: id
            });

            if(!exists) {
                throw new NotFoundException('Rating not found');
            }

            return this.ratingRepository.save(rating);
    }

  
}

