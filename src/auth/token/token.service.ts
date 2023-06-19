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

	#validationToken(token: string, key: string): string | null {

		const checkedToken = this.jwtService.verify(token, { secret: key });
		return (typeof checkedToken === `object` && `id` in checkedToken) ?
			checkedToken.id as string : null;
	}

	generateTokens(payload: UserDTO): TokensDTO {
		const accessToken: string = this.jwtService.sign(payload, { secret: env.JWT_ACCESS_SECRET, expiresIn: '5m' })
		const refreshToken: string = this.jwtService.sign(payload, { secret: env.JWT_REFRESH_SECRET, expiresIn: '15d' })

		return { refreshToken, accessToken };
	}

	validationAccessToken(token: string): string | null {
		try {
			return this.#validationToken(token, env.JWT_ACCESS_SECRET!)
		} catch (error) {
			return null;
		}
	};

	validationRefreshToken(token: string): string | null {
		try {
			return this.#validationToken(token, env.JWT_REFRESH_SECRET!)
		} catch (error) {
			return null;
		}
	};


}
