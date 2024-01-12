import { Readable, Writable, Transform } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const number = this.index++;

    setTimeout(() => {
      if (number > 100) {
        this.push(null);
      } else {
        const buffer = Buffer.from(`${number}\n`, 'utf-8');
        this.push(buffer);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(`${transformed}\n`, 'utf-8'));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
    // const number = Number(chunk.toString());
    // const result = number * 10;

    // setTimeout(() => {
    //   process.stdout.write(`${result}\n`);
    //   callback();
    // }, 1000);
  }
}



new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());