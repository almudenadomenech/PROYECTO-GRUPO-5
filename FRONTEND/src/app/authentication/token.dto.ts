// Respuesta del backend, objeto con el token JWT
export interface Token {
    token: string;
  }
  
  // Token JWT decodificado para acceder a sus datos
  export interface DecodedToken {
    sub: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
  }