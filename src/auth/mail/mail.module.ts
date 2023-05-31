import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
	imports: [

		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (confifServise: ConfigService) => ({
				transport: createTransport({
					host: confifServise.get('SMTPT_HOST'),
					port: confifServise.get('SMPT_PORT'),
					secure: false,
					auth: {
						user: confifServise.get('SMPT_USER'),
						pass: confifServise.get('SMPT_PASSWORD'),
					}
				})
			})

		})
	],
	exports: [MailService],
	providers: [MailService]
})
export class MailModule { }
