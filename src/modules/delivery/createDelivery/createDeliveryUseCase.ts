import { prisma } from "../../../database/prismaClients";

interface IcreateDelivery {
  item_name: string;
  id_client: string;
}

export class CreateDeliveryUseCase {
  async execute({ item_name, id_client }: IcreateDelivery) {
    const delivery = await prisma.deliveries.create({
      data: { item_name, id_client },
    });
    return delivery;
  }
}
