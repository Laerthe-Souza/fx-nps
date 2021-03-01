import transport, { mailTemplateParse } from '../config/nodemailer';

interface MailData {
  name: string;
  title: string;
  description: string;
  link: string;
  surveyUserId: string;
}

interface SendMailData {
  to: string;
  subject: string;
  body: MailData;
}

class SendMailService {
  public async execute({ to, subject, body }: SendMailData): Promise<void> {
    const html = mailTemplateParse(body);

    const message = await transport.sendMail({
      to,
      subject,
      html,
      from: 'NPS <noreplay@nps.com.br>',
    });

    console.log('Message sent: %s', message.messageId);
  }
}

export default SendMailService;
