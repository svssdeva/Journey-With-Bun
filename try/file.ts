import type { BunFile } from "bun";
import { watch } from 'fs';
import fs from 'node:fs';

const file: BunFile = Bun.file('./index.ts');
console.log(file.size);
console.log(file.type);
console.log(await file.text());

const pkg: BunFile = Bun.file('./package.json');
const data = await pkg.json();

console.log(data.name);

const fileTwo: BunFile = Bun.file('./calc.ts');
const arrBuffer = await fileTwo.arrayBuffer();
console.log(arrBuffer);
const buffer = Buffer.from(arrBuffer);
console.log(buffer);


const stream = fileTwo.stream();

for await (const chunk of stream) {
    console.log('23', chunk);
}



watch(import.meta.dir, (event, filename) => {
    console.log(event, filename);
})


Bun.write('./index.html', 'Hello World');
fs.appendFileSync('./index.html', 'Hello World 2');


fs.unlink('./test.txt', () => {
    console.log('file deleted')
});

fs.unlinkSync('./test.txt');
console.log('File deleted');