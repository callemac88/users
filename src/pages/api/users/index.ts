// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../app/interfaces";

type Data = Array<User>;

const users = [
  {
    id: 1,
    name: "Manuel Calle Pérez",
  },
  {
    id: 2,
    name: "Alejandra Alvarez",
  },
  {
    id: 3,
    name: "Juan Manuel Calle Alvarez",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(users);
}
