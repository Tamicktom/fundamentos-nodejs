import http from 'node:http';

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'Rafael',
      email: 'rafael@exemplo.com'
    });

    return res
      .setHeader('Content-Type', 'application/json')
      .end('Criar usuário');
  }

  return res.end('Hello World!');
});

server.listen(3000);