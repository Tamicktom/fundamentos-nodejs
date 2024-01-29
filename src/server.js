import http from 'node:http';

const PORT = 3333;

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }

  console.log(req.body);

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body;

    users.push({
      id: 1,
      name,
      email,
    });

    return res
      .writeHead(201)
      .end('Criar usuário');
  }

  return res.writeHead(404).end('Not found');
});

server.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);