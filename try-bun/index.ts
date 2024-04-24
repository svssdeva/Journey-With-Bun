console.log("Hello via Bun! 1st project");
console.log('watch mode restarts the application');
console.log('hot mode does not restart the application, stateful objects are not lost');


declare global {
    var count: number;
}

var localcount: number;

globalThis.count ??= 0;
localcount ??= 0;

console.log("reloaded times: ", globalThis.count, "localcount: ", localcount);

globalThis.count++;
localcount++;


//export and import

import { sum } from "./calc";

console.log(sum(1, 2));