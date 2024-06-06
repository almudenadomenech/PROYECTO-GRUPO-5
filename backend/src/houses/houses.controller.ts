import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param,
    ParseBoolPipe,
    ParseIntPipe, Post, Put, UploadedFile, UseInterceptors, 
    UsePipes,
    ValidationPipe} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from './houses.model';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('houses')
export class HousesController {
    constructor(@InjectRepository(House) 
    private houseRepository: Repository<House>) {}

    @Get()
    
    findAll() {
        return this.houseRepository.find();
    }


    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.houseRepository.findOne({
            where: {
                id: id
            }
        });
    }

    @Get('filter-by-title')
    findByTitle(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepository.findOne({
            where: {
                title: id
            }
        });
    }

    @Get('filter-by-address')
    findByAdress(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepository.findOne({
            where: {
                address: id
            }
        });
    }

    @Get('filter-by-phone')
    findByPhone(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepository.findOne({
            where: {
                phone: id
            }
        });
    }

    @Get('filter-by-places')
    findByPlaces(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepository.findOne({
            where: {
                places: id
            }
        });
    }

    @Get('filter-by-bedrooms')
    findByBedrooms(@Param('id', ParseIntPipe) id: number) {
        return this.houseRepository.findOne({
            where: {
                bedrooms: id
            }
        });
    }

    @Get('filter-by-bathrooms')
    findByBathrooms(@Param('id', ParseIntPipe) id: number) {
        return this.houseRepository.findOne({
            where: {
                bathrooms: id
            }
        });
    }


    @Get('filter-by-price')
    findByPrice(@Param('id', ParseIntPipe) id: number) {
        return this.houseRepository.findOne({
            where: {
                price: id
            }
        });
    }

    @Get('filter-by-meters')
    findBymeters(@Param('id', ParseIntPipe) id: number) {
        return this.houseRepository.findOne({
            where: {
                meters: id
            }
        });
    }

    @Get('filter-by-destination')
    findByDestination(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepository.findOne({
            where: {
                destination: id
            }
        });
    }

    @Get('filter-by-petFriendly')
    findByPetFriendly(@Param('id', ParseBoolPipe) id: boolean) {
        return this.houseRepository.find({
            where: {
                petFriendly: id
            }
        });
    }

    @Get('filter-by-pool')
    findByPool(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepository.find({
            where: {
                pool: id
            }
        });
    }

    @Get('filter-by-garden')
    findByGarden(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepository.find({
            where: {
                garden: id
            }
        });
    }

    @Get('filter-by-terrace')
    findByTerrace(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepository.find({
            where: {
                terrace: id
            }
        });
    }

    @Get('filter-by-wifi')
    findByWifi(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepository.find({
            where: {
                wifi: id
            }
        });
    }

    @Get('filter-by-air')
    findByAir(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepository.find({
            where: {
                air: id
            }
        });
    }

    @Get('filter-by-description')
    findByDescription(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepository.find({
            where: {
                description: id
            }
        });
    }

    @Get('filter-by-photoUrl')
    findByPhotoUrl(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepository.find({
            where: {
                photoUrl: id
            }
        });
    }



    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File,
    @Body() houses: House){

        if (file) {
            houses.photoUrl = file.filename;
        }
        return await this.houseRepository.save(houses);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @UploadedFile() file: Express.Multer.File,
        @Param('id', ParseIntPipe) id: number,
        @Body() houses: House
        ) {

            if(!await this.houseRepository.existsBy({id: id})) {
                throw new NotFoundException('House not found');
            }

            if (file) {
                houses.photoUrl = file.filename;
            }
            houses.id = id; 
       
            return await this.houseRepository.save(houses);
 
    }

    @Delete(':id')
async deleteById(
    @Param('id', ParseIntPipe) id: number
) {
    const exists = await this.houseRepository.existsBy({ id: id });

    if (!exists) {
        throw new NotFoundException('House not found');
    }

    try {
        const house = await this.houseRepository.findOne({ where: { id: id } });
        await this.houseRepository.remove(house);
    } catch (error) {
        console.log("Error al borrar la casa", error);
        throw new ConflictException('No se puede borrar.');
    }
}

}
