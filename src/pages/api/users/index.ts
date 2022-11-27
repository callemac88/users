// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { findAllUsers, createUser } from "../../../app/services/user.service";

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
  const { body } = req;
  const user = {
    email: body.email,
    password: body.password,
    name: body.name,
  };
  const rta = await createUser(user);
  res.status(200).json(rta);
};
