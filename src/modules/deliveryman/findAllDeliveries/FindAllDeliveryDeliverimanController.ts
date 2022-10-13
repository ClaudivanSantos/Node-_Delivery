import { Request, Response } from "express";
import { FindAllDeliveryDeliverimanUseCase } from "./FindAllDeliveryDeliverimanUseCase";

export class FindAllDeliveryDeliverimanController{
    async handle(req: Request, res: Response){
        const {id_deliveryman} = req

        const findAllDeliveriesUseCase = new FindAllDeliveryDeliverimanUseCase();
        const deliveries = await findAllDeliveriesUseCase.execute(id_deliveryman)

        return res.json(deliveries)
    }
}