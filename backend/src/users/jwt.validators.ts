// Clase para validar el token que viene del frontend en cada petición.

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {Strategy, ExtractJwt} from 'passport-jwt'
import { Repository } from "typeorm";
import { User } from "./users.model";
import { DecodedToken } from "./decoded-token.dto";



@Injectable()
export class JwtValidator extends PassportStrategy(Strategy){

    constructor( @InjectRepository(User) private userRepository: Repository<User>){
        // Configurar la extracción del token y la clave para verificar la firma del token
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae token de header Authorization
            ignoreExpiration: false,
            secretOrKey: 'admin'

        });
    }

    // Valida el contenido del token JWT que llega de frontend
    async validate(payload:DecodedToken){
      
        // comprobar si el usuario es correcto
       const user= await this.userRepository.findOne({

            where: {
                id: payload.sub // id del usuario que viene en el token
            }
        });
         if(!user)
            throw new UnauthorizedException('usuario incorrecto'); // 401

        return user;
        
    }
    
}