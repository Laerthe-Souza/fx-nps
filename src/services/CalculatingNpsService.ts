import { getCustomRepository, IsNull, Not } from 'typeorm';
import SurveyUserRepository from '../repositories/SurveyUserRepository';

interface NpsData {
  detractors: number;
  passives: number;
  promotors: number;
  totalAnswers: number;
  nps: number;
}

class CalculatingNpsService {
  public async execute(surveyId: string): Promise<NpsData> {
    const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id: surveyId,
      value: Not(IsNull()),
    });

    const detractors = surveysUsers.filter(surveyUser => surveyUser.value < 7)
      .length;
    const passives = surveysUsers.filter(
      surveyUser => surveyUser.value > 5 && surveyUser.value < 8,
    ).length;
    const promotors = surveysUsers.filter(surveyUser => surveyUser.value > 7)
      .length;

    const totalAnswers = surveysUsers.length;

    const nps = ((promotors - detractors) / totalAnswers) * 100;

    return { detractors, passives, promotors, totalAnswers, nps };
  }
}

export default CalculatingNpsService;
