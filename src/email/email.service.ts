import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { EmailDto } from './dtos/email.dto';
import { InviteEmailDto } from './dtos/invite-email.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly mailService: MailService;
  private shamanWebUrl: string =
    this.configService.get<string>('SHAMAN_WEB_URL');
  private mailKey: string = this.configService.get<string>('SENDGRID_API_KEY');

  constructor(private configService: ConfigService) {
    this.shamanWebUrl = this.configService.get('SHAMAN_WEB_URL');
    this.mailKey = this.configService.get('SENDGRID_API_KEY');

    this.mailService = new MailService();
    this.mailService.setApiKey(this.mailKey);
  }

  async sendEmail({
    recipientEmail,
    template,
    token,
  }: EmailDto): Promise<void> {
    const msg = {
      to: recipientEmail,
      from: 'noreply@tengrilights.com',
      templateId: template,
      dynamic_template_data: {
        invitationCode: token,
        link: `${this.shamanWebUrl}/login`,
      },
    };
    try {
      await this.mailService.send(msg);
    } catch (error) {
      throw new Error(`Could not send email... ${error.message}`);
    }
  }

  async sendInviteEmail({
    recipientEmail,
    token,
  }: InviteEmailDto): Promise<void> {
    const inviteMsg = {
      recipientEmail,
      template: 'd-903d679c71d0401abb413ce639428e40',
      token,
    };
    await this.sendEmail(inviteMsg);
  }
}
