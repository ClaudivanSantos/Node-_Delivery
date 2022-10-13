import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClients";

interface iAutenticateClient {
  username: string;
  password: string;
}

export class AutenticateClientUseCase {
  //receber username e password
  async execute({ password, username }: iAutenticateClient) {
    //Verrificar se username já foi cadastrado
    const client = await prisma.clients.findFirst({
      where: { username: username },
    });
    if (!client) {
      throw new Error("Username or password invalid");
    }
    //Verificar se senha corresponde ao username
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid");
    }
    //Gerar token
    const token = sign({ username }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {
      subject: client.id,
      expiresIn: "1d",
    });
    return token;
  }
}
