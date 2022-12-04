const input = await Deno.readTextFile("./day-4/day4.in");

const pairs = input
  .split("\n")
  .filter(Boolean)
  .map((s) => s.split(","))
  .map(([f, s]) => [
    f.split("-").map((num) => Number.parseInt(num, 10)),
    s.split("-").map((num) => Number.parseInt(num, 10)),
  ])
  .filter(
    ([[x1, x2], [y1, y2]]) => x1 <= y2 && y1 <= x2 // (x1 <= y1 && y2 <= x2) || (y1 <= x1 && x2 <= y2)
  ).length;
console.log(pairs);
