import { Request, Response } from "express";
import { AutenticateClientUseCase } from "./AuthenticateClientUseCase";

export class AuthenticateClientController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    const autenticateClientUseCase = new AutenticateClientUseCase();
    const result = await autenticateClientUseCase.execute({
      username,
      password,
    });
    return res.json(result);
  }
}
