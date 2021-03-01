import { Router } from 'express';
import AnswerController from './controllers/AnswerController';
import NpsController from './controllers/NpsController';

import SurveyController from './controllers/SurveyController';
import SurveyUserController from './controllers/SurveyUserController';
import UserController from './controllers/UserController';

const userController = new UserController();
const surveyController = new SurveyController();
const surveyUserController = new SurveyUserController();
const answerController = new AnswerController();
const npsController = new NpsController();

const routes = Router();

routes.post('/users', userController.create);

routes.post('/surveys', surveyController.create);
routes.get('/surveys', surveyController.show);

routes.post('/surveys/users', surveyUserController.create);
routes.patch('/surveys/users/answers/:value', answerController.execute);
routes.get('/surveys/users/nps/:surveyId', npsController.execute);

export default routes;
