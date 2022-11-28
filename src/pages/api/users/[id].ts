// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { validatorHandler } from "../../../app/middleware/validator.handler";
import bcrypt from "bcrypt";
import {
  findOne,
  updateUser,
  deleteUser,
} from "../../../app/services/user.service";
import { updateUserSchema } from "../../../app/schemas/user.schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      findbyKey(req, res);
      break;
    case "PUT":
      update(req, res);
      break;
    case "DELETE":
      deleteByKey(req, res);
      break;
    default:
      break;
  }
}

const findbyKey = async (req, res) => {
  const user = await findOne(Number(req.query.id));
  res.status(201).json(user);
};

const update = async (req, res) => {
  validatorHandler(updateUserSchema, "body", res, req);
  const oldUser = req.body;
  if (oldUser.password && oldUser.password.length > 0) {
    oldUser.password = await bcrypt.hash(oldUser.password, 10);
  } else {
    delete oldUser.password;
  }
  const user = await updateUser(req.body);
  res.status(200).json(user);
};

const deleteByKey = async (req, res) => {
  const user = await deleteUser(Number(req.query.id));
  res.status(200).json(user);
};
