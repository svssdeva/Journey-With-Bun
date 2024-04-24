export function sum(x: number, y: number): number {
    return x + y;
}

export function sub(x: number, y: number): number {
    return x - y;
}

function multiply(x: number, y: number): number {
    return x * y;
}
function divide(x: number, y: number): number {
    return x / y;
}

exports.multiply = multiply;
exports.divide = divide;