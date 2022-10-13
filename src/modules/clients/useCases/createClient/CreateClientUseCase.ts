import { prisma } from "../../../../database/prismaClients";
import { hash } from "bcrypt";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ password, username }: ICreateClient) {
    // Validar se o cliente existe
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    if (clientExists) {
      throw new Error(`Client ${username} already exists`);
    }
    //Criptografar senha
    const hashPassword = await hash(password, 10);
    //Criar user
    const client = await prisma.clients.create({
      data: { username, password: hashPassword },
    });
    return client;
  }
}
