import { Request, Response } from 'express';
import CalculatingNpsService from '../services/CalculatingNpsService';

class NpsController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { surveyId } = request.params;

    const calculatingNps = new CalculatingNpsService();

    const nps = await calculatingNps.execute(surveyId);

    return response.status(200).json(nps);
  }
}

export default NpsController;
