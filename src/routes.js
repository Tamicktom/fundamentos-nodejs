import { randomUUID } from "node:crypto";

import { Database } from './database.js';
import { buildRoadPath } from "./utils/build-road-path.js";

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoadPath('/users'),
    handler: async (req, res) => {
      const users = database.select('users');

      return res
        .end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    path: buildRoadPath('/users'),
    handler: async (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert('users', user);

      return res
        .writeHead(201)
        .end('Criar usuário');
    }
  },
  {
    method: "DELETE",
    path: buildRoadPath("/users/:id"),
    handler: async (req, res) => {

    },
  }
];