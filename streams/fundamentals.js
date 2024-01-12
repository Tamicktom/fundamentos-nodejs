import { Readable } from 'node:stream';

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

new OneToHundredStream().pipe(process.stdout);