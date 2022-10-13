import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClients";

interface iAutenticateDeliveryman {
  username: string;
  password: string;
}

export class AutenticateDeliverymanUseCase {
  //receber username e password
  async execute({ password, username }: iAutenticateDeliveryman) {
    //Verrificar se username já foi cadastrado
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { username: username },
    });
    if (!deliveryman) {
      throw new Error("Username or password invalid");
    }
    //Verificar se senha corresponde ao username
    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid");
    }
    //Gerar token
    const token = sign({ username }, "fyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {
      subject: deliveryman.id,
      expiresIn: "1d",
    });
    return token;
  }
}
