import { prisma } from "../../../database/prismaClients";
import { hash } from "bcrypt";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ password, username }: ICreateDeliveryman) {
    // Validar se o cliente existe
    const clientExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    if (clientExists) {
      throw new Error(`Deliveryman ${username} already exists`);
    }
    //Criptografar senha
    const hashPassword = await hash(password, 10);
    //Criar user
    const deliveryman = await prisma.deliveryman.create({
      data: { username, password: hashPassword },
    });
    return deliveryman;
  }
}
