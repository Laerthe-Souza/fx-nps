import { Request, Response } from 'express';

import CreateAnswerService from '../services/CreateAnswerService';

class AnswerController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { value } = request.params;
    const { u } = request.query;
    console.log(u);
    const createAnswer = new CreateAnswerService();

    const surveyUser = await createAnswer.execute({
      value: Number(value),
      surveyUserId: String(u),
    });

    return response.status(200).json(surveyUser);
  }
}

export default AnswerController;
