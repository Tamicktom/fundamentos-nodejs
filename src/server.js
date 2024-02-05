import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';


const PORT = 3333;

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(route => (
    route.method === method && route.path.test(url)
  ));

  if (route) {
    const routeParams = req.url.match(route.path).slice(1);

    return await route.handler(req, res);
  }

  return res.writeHead(404).end('Not found');
});

server.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);