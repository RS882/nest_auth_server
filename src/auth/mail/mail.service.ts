import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { env } from 'process';

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) { }

	public async sendActivationLink(to: string, link: string): Promise<void> {

		this.mailerService.sendMail({
			from: env.SMPT_USER,
			to: to,
			subject: `Activation of the account on ${env.API_URL}`,
			text: ``,
			html: `
			<div>
				<h1> For activation, follow the link</h1>
				<a href="${link}">${link} </a>
			</div>
			`,
		})



	}
}
