import type { BunFile } from 'bun';
import { watch } from 'node:fs';

watch(import.meta.dir + '/index.html', (event, filename) => {
    if (event === 'change') {
        copy(filename);
    }
})

async function copy(filename: string | null) {
    const file: BunFile = Bun.file(`./${filename}`);
    const text: string = await file.text();
    console.log(text);
    Bun.write('./index2.html', text);
}