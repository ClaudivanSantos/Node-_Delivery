import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAutenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token missing" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "fyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    ) as IPayload;
    console.log(sub);
    request.id_deliveryman = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token!" });
  }
}
