// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { validatorHandler } from "../../../app/middleware/validator.handler";
import { findAllUsers, createUser } from "../../../app/services/user.service";
import { createUserSchema } from "../../../app/schemas/user.schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      findAll(req, res);
      break;
    case "POST":
      create(req, res);
      break;
    default:
      break;
  }
}

const findAll = async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await findAllUsers();
  res.status(200).json(users);
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  validatorHandler(createUserSchema, "body", res, req);
  const rta = await createUser(req.body);
  res.status(200).json(rta);
};
