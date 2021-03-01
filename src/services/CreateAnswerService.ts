import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import SurveyUser from '../models/SurveyUser';
import SurveyUserRepository from '../repositories/SurveyUserRepository';

interface AnswerData {
  surveyUserId: string;
  value: number;
}

class CreateAnswerService {
  public async execute({
    surveyUserId,
    value,
  }: AnswerData): Promise<SurveyUser> {
    const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      survey_id: surveyUserId,
    });

    if (!surveyUser) {
      throw new AppError('Survey does not exists');
    }

    surveyUser.value = value;

    await surveysUsersRepository.save(surveyUser);

    return surveyUser;
  }
}

export default CreateAnswerService;
