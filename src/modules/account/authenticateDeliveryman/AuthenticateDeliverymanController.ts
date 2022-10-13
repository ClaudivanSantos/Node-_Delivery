import { Request, Response } from "express";
import { AutenticateDeliverymanUseCase } from "./AuthenticateDeliverymanUseCase";

export class AuthenticateDeliverymanController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    const autenticateDeliveryUseCase = new AutenticateDeliverymanUseCase();
    const result = await autenticateDeliveryUseCase.execute({
      username,
      password,
    });
    return res.json(result);
  }
}
