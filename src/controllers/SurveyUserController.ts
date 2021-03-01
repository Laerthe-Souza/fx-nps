import { Request, Response } from 'express';

import CreateSurveyUserService from '../services/CreateSurveyUserService';

class SurveyUserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, surveyId } = request.body;

    const createSurveyUser = new CreateSurveyUserService();

    const surveyUser = await createSurveyUser.execute({ email, surveyId });

    return response.status(201).json(surveyUser);
  }
}

export default SurveyUserController;
