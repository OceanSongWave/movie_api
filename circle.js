// circle.js
let PI = 3.14159265359;
module.exports.area = (radius) => Math.pow(radius, 2) * PI;
module.exports.circumference = (radius) => 2 * radius * PI;

// const PI = 3.14159265359;
// export function area(radius) { return radius ** 2 * PI; }
// export function circumference(radius) { return 2 * radius * PI; }