import { BadRequestException, Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Request, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.model';
import { Register } from './register.dto';
import { Role } from './role.model';
import { Login } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    @Get()
    findAll() {
        return this.userRepository.find();
    }
    @Get('filter-by-id/:id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.userRepository.findOne({
            where: {
                id: id
            }
        });

    }
    @Get('account')
    @UseGuards(AuthGuard('jwt'))
    public getCurrentAccountUser(@Request() request) {

        return request.user;
    }

     @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() user: User
    ) {

        const exists = await this.userRepository.existsBy({
            id: id
        });

        if (!exists) {
            throw new NotFoundException('User not found');
        }

        return this.userRepository.save(user);

    } 

    @Put()
    @UseGuards(AuthGuard('jwt'))
    public updateUser(@Body() user: User, @Request() request) {


        if (request.user.role !== Role.ADMIN && user.id !== request.user.id) {
           
            throw new UnauthorizedException();
        }

        return this.userRepository.save(user);
    } 
    @Post('register')
    async register(@Body() register: Register) {

        const exists = await this.userRepository.existsBy({
            email: register.email
        });

        if (exists)
            throw new ConflictException("Email ocupado");


        const user: User = {
            id: 0,
           
            email: register.email,
            password: register.password,
            phone: null,
            photoUrl: null,

            role: Role.USER
        };
        return await this.userRepository.save(user);
    }

    @Post('login')
    async login(@Body() login: Login) {


        const exists = await this.userRepository.existsBy({
            email: login.email
        });
        if (!exists)
            throw new NotFoundException("Usuario no encontrado.");


        const user = await this.userRepository.findOne({
            where: {
                email: login.email
            }
        });

        if (user.password !== login.password) {
            throw new UnauthorizedException("Datos incorrectos");
        }

        let userData = {
            sub: user.id,
            email: user.email,
            role: user.role,

        };

        let token = {
            token: await this.jwtService.signAsync(userData)
        }
        return token;
    }

    @Post('avatar')
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard('jwt'))
    async uploadAvatar(
        @UploadedFile() file: Express.Multer.File,
        @Request() request
    ) {
        if (!file) {
            throw new BadRequestException('Archivo incorrecto')
        }

        // guardar la ruta del archivo, hay que crear un atributo del user
        request.user.photoUrl = file.filename;
        return await this.userRepository.save(request.user);

    }


    @Delete(':id')
    async deleteById(
        @Param('id', ParseIntPipe) id: number
    ) {
        const exists = await this.userRepository.existsBy({ id: id });

        if (!exists) {
            throw new NotFoundException('User not found');
        }

        try {
            await this.userRepository.delete(id);
        } catch (error) {
            console.log("Error al borrar el usuario", error);
            throw new ConflictException('No se puede borrar.');
        }

    }
}
