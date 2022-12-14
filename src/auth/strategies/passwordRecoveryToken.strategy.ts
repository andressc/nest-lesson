import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UserModel } from '../../database/entity';
import { UsersRepository } from '../../users/infrastructure/repository';
import { PasswordRecoveryTokenDataDto } from '../dto';
import { EmailBadRequestException } from '../../common/exceptions';
import { AuthConfig } from '../../configuration';

@Injectable()
export class PasswordRecoveryTokenStrategy extends PassportStrategy(
	Strategy,
	'jwt-recovery-password',
) {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly authConfig: AuthConfig,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request?.body?.recoveryCode;
				},
			]),

			ignoreExpiration: false,
			secretOrKey: authConfig.getRecoveryTokenSecret(),
			passReqToCallback: true,
		});
	}

	async validate(req: Request, payload: any): Promise<PasswordRecoveryTokenDataDto> {
		const user: UserModel = await this.usersRepository.findUserModelByEmail(payload.sub);
		if (!user) throw new EmailBadRequestException();

		return {
			userId: user._id,
		};
	}
}
