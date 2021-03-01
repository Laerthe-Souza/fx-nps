import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import handlebars, { TemplateDelegate } from 'handlebars';

interface MailTemplateData {
  name: string;
  title: string;
  description: string;
}

export const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const filePath = path.resolve(
  __dirname,
  '..',
  'views',
  'emails',
  'npsMail.hbs',
);

const mailTemplate = fs.readFileSync(filePath).toString('utf-8');

export const mailTemplateParse: TemplateDelegate<MailTemplateData> = handlebars.compile(
  mailTemplate,
);

export default transport;
