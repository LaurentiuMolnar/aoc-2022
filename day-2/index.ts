const input = await Deno.readTextFile("./day-2/day2.in");

const shapeScores = {
  X: 1,
  Y: 2,
  Z: 3,
};

const outcomeScores = {
  X: {
    A: 3,
    B: 0,
    C: 6,
  },
  Y: {
    A: 6,
    B: 3,
    C: 0,
  },
  Z: {
    A: 0,
    B: 6,
    C: 3,
  },
};

const rounds: Array<["A" | "B" | "C", "X" | "Y" | "Z"]> = input
  .split("\n")
  // .filter(Boolean)
  .map((line) => {
    const [first, , second] = line.split("");
    return [first, second] as any;
  });

// console.log(rounds);

function score(f: typeof rounds[number][0], s: typeof rounds[number][1]) {
  const sum = shapeScores[s] + outcomeScores[s][f];
  // console.log(`${f} ${s}: ${sum}`);

  return sum;
}
const totalScore = rounds.reduce((total, [f, s]) => {
  return total + score(f, s);
}, 0);

// part 2

const roundResults = {
  X: 0,
  Y: 3,
  Z: 6,
};

const moves: Record<
  "A" | "B" | "C",
  Record<"X" | "Y" | "Z", "X" | "Y" | "Z">
> = {
  A: {
    X: "Z",
    Y: "X",
    Z: "Y",
  },
  B: {
    X: "X",
    Y: "Y",
    Z: "Z",
  },
  C: {
    X: "Y",
    Y: "Z",
    Z: "X",
  },
};

function score2(f: typeof rounds[number][0], s: typeof rounds[number][1]) {
  const sum = shapeScores[moves[f][s]] + outcomeScores[moves[f][s]][f];
  return sum;
}

const totalScore2 = rounds.reduce((total, [f, s]) => total + score2(f, s), 0);

console.log(totalScore2);
