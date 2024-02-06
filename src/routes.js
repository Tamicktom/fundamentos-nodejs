import { randomUUID } from "node:crypto";

import { Database } from './database.js';
import { buildRoadPath } from "./utils/build-road-path.js";

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoadPath('/users'),
    handler: async (req, res) => {
      const { search } = req.query;


      const users = database.select('users', search ? {
        name: search,
        email: search,
      } : null);

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
      const { id } = req.params;

      database.delete("users", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoadPath("/users/:id"),
    handler: async (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;

      database.update("users", id, { id, name, email });

      return res.writeHead(204).end();
    },
  }
];