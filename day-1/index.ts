const input = await Deno.readTextFile("./day-1/day1.in");
const lists = input
  .split("\n")
  .reduce(
    (acc, str) => {
      if (str) {
        acc.at(-1)?.push(Number.parseInt(str, 10));
      } else {
        acc.push([]);
      }
      return acc;
    },
    [[]] as number[][]
  )
  .filter((arr) => arr.length !== 0);
const totals = lists.map((arr) => arr.reduce((sum, num) => sum + num, 0));
console.log(
  totals
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, num) => sum + num, 0)
);
