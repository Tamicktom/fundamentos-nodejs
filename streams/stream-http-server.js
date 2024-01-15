import http from "node:http";
import { Readable, Writable, Transform } from 'node:stream';

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(`${transformed}\n`, 'utf-8'));
  }
}

const server = http.createServer((req, res) => {
  return req
    .pipe(new InverseNumberStream())
    .pipe(res);
});

server.listen(3334);

console.log('Server listening on port 3334');