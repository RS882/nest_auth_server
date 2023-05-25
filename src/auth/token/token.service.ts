import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';

import { UserDTO } from '../DTO/user.dto';
import { TokensDTO } from '../DTO/tokens.dto';



@Injectable()
export class TokenService {
	constructor(

		private readonly jwtService: JwtService
	) { }
	generateTokens(payload: UserDTO): TokensDTO {
		const accessToken: string = this.jwtService.sign(payload, { secret: env.JWT_ACCESS_SECRET, expiresIn: '5m' })
		const refreshToken: string = this.jwtService.sign(payload, { secret: env.JWT_REFRESH_SECRET, expiresIn: '15d' })

		return { refreshToken, accessToken };


	}


}
