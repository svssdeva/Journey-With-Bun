const buffer = Buffer.alloc(5);

buffer.write('BunJs');
console.log(buffer);
console.log(buffer.toString());



const arrBuffer = new ArrayBuffer(8);
console.log(arrBuffer);

const u16Arr = new Uint16Array(8);
console.log(u16Arr);

const u32Arr = new Uint32Array(8);
console.log(u32Arr);

const u8Arr = new Uint8Array(arrBuffer);
console.log(u8Arr);


