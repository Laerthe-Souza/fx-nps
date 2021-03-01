import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import SurveyRepository from '../repositories/SurveyRepository';

interface SurveyData {
  title: string;
  description: string;
}

class CreateSurveyService {
  public async execute({
    title,
    description,
  }: SurveyData): Promise<SurveyData> {
    const surveysRepository = getCustomRepository(SurveyRepository);

    const titleAlreadyExists = await surveysRepository.findOne({
      title,
    });

    if (titleAlreadyExists) {
      throw new AppError('Esse título já existe');
    }

    const user = surveysRepository.create({
      title,
      description,
    });

    await surveysRepository.save(user);

    return user;
  }
}

export default CreateSurveyService;
