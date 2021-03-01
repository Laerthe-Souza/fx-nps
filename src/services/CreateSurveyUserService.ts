import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import SurveyUser from '../models/SurveyUser';
import SurveyRepository from '../repositories/SurveyRepository';
import SurveyUserRepository from '../repositories/SurveyUserRepository';
import UserRepository from '../repositories/UserRepository';

import SendMailService from './SendMailService';

interface SurveyUserData {
  email: string;
  surveyId: string;
}

class CreateSurveyUserService {
  public async execute({
    email,
    surveyId,
  }: SurveyUserData): Promise<SurveyUser> {
    const usersRepository = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveyRepository);
    const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new AppError('User does not exists');
    }

    const survey = await surveysRepository.findOne({
      id: surveyId,
    });

    if (!survey) {
      throw new AppError('Survey does not exists');
    }

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: user.id, value: null },
    });

    const sendMail = new SendMailService();

    if (surveyUserAlreadyExists) {
      await sendMail.execute({
        to: email,
        subject: survey.title,
        body: {
          name: user.name,
          title: survey.title,
          description: survey.description,
          surveyUserId: surveyUserAlreadyExists.id,
          link: `${process.env.API_URL}/answers`,
        },
      });

      return surveyUserAlreadyExists;
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id: surveyId,
    });

    await surveysUsersRepository.save(surveyUser);

    await sendMail.execute({
      to: email,
      subject: survey.title,
      body: {
        name: user.name,
        title: survey.title,
        description: survey.description,
        surveyUserId: surveyUser.id,
        link: `${process.env.API_URL}/answers`,
      },
    });

    return surveyUser;
  }
}

export default CreateSurveyUserService;
