import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveyRepository from '../repositories/SurveyRepository';

import CreateSurveyService from '../services/CreateSurveyService';

class SurveyController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const createSurvey = new CreateSurveyService();

    const survey = await createSurvey.execute({ title, description });

    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const surveysRepository = getCustomRepository(SurveyRepository);

    const allSurveys = await surveysRepository.find();

    return response.status(200).json(allSurveys);
  }
}

export default SurveyController;
