import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email });

    return response.status(201).json(user);
  }
}

export default UserController;
