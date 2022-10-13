import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAutenticateClient";
import { ensureAutenticateDeliveryman } from "./middlewares/ensureAutenticateDeliveryman";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/FindAllDeliveriesController";
import { CreateDeliveryController } from "./modules/delivery/createDelivery/createDeliveryController";
import { FindAllAvailableController } from "./modules/delivery/findAllAvailable/FindAllAvailableController";
import { UpdateDeliverymanController } from "./modules/delivery/updateDelivery/UpdateDeliveryController";
import { UpdateEndDateController } from "./modules/delivery/updateEndDate/UpdateEndDateController";
import { CreateDeliverymanController } from "./modules/deliveryman/createDeliveryman/CreateDeliveryController";
import { FindAllDeliveryDeliverimanController } from "./modules/deliveryman/findAllDeliveries/FindAllDeliveryDeliverimanController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliveryController = new AuthenticateDeliverymanController();
const deliveryController = new CreateDeliveryController();
const findAllAvailable = new FindAllAvailableController()
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesClient = new FindAllDeliveriesController();
const findAllDeliveryDeliverimanController = new FindAllDeliveryDeliverimanController()
const updateEndDateController = new UpdateEndDateController();

routes.post("/client/", createClientController.handle);
routes.post("/client/athenticate", authenticateClientController.handle)
routes.post("/deliveryman/athenticate", authenticateDeliveryController.handle)
routes.post("/deliveryman", createDeliverymanController.handle)
routes.post("/delivery", ensureAuthenticateClient, deliveryController.handle)
routes.get("/delivery/available", ensureAutenticateDeliveryman, findAllAvailable.handle)
routes.put(
    '/delivery/updateDeliveryman/:id',
    ensureAutenticateDeliveryman,
    updateDeliverymanController.handle,
  );
routes.get("/client/deliveries",ensureAuthenticateClient, findAllDeliveriesClient.handle)
routes.get("/deliveryman/deliveries",ensureAutenticateDeliveryman, findAllDeliveryDeliverimanController.handle)
routes.put("/delivery/updateEndDate/:id", ensureAutenticateDeliveryman, updateEndDateController.handle)

export { routes };
