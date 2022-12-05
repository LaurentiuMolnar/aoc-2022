const [chart, movesString] = (await Deno.readTextFile("./day-5/day5.in")).split(
  "\n\n"
);

type MoveInstruction = {
  boxCount: number;
  initialPosition: number;
  destination: number;
};

const moveInstructionRegex =
  /^move (?<boxCount>[0-9]+) from (?<initialPosition>[0-9]+) to (?<destination>[0-9]+)$/;

const moveInstructions = movesString.split("\n");
const parsedInstructions = moveInstructions
  .map((m) => {
    const match = moveInstructionRegex.exec(m);

    if (!match) return null;

    return {
      boxCount: match.groups?.["boxCount"]
        ? Number.parseInt(match.groups["boxCount"], 10)
        : 0,
      initialPosition: match.groups?.["initialPosition"]
        ? Number.parseInt(match.groups["initialPosition"], 10)
        : 0,
      destination: match.groups?.["destination"]
        ? Number.parseInt(match.groups["destination"], 10)
        : 0,
    };
  })
  .filter((i): i is MoveInstruction => !!i);

const chartLines = chart.split("\n");

// take only the boxes without the number row
const rows = chartLines.slice(0, -1).join("\n");
const columnCount = Math.max(
  ...(chartLines
    .at(-1)
    ?.replaceAll(/\s+/g, " ")
    .split(" ")
    .filter((s): s is string => !!s)
    .map((s) => Number.parseInt(s, 10)) ?? [])
);

const parseBoxChart = (rows: string) => {
  const rowsCopy = `${rows}`;
  let arrangement: string[][] = Array(columnCount)
    .fill([])
    .map((_) => []);
  const parsedRows = rowsCopy
    .replaceAll("    ", " [-]")
    .replaceAll(" [", "[")
    .replaceAll(/[\[ | \]]/g, "")
    .split("\n");

  for (const row of parsedRows) {
    for (let j = 0; j < columnCount; j++) {
      if (row[j] !== "-") {
        arrangement[j].push(row[j]);
      }
    }
  }

  arrangement = arrangement.map((arr) => arr.reverse());
  return arrangement;
};

const getMessage = (boxChart: string[][]) =>
  boxChart.reduce((msg, boxes) => `${msg}${boxes.at(-1) ?? ""}`, "");

// part 1
const part1Boxes = parseBoxChart(rows);

for (const { boxCount, initialPosition, destination } of parsedInstructions) {
  for (let i = 0; i < boxCount; i++) {
    const boxContent = part1Boxes[initialPosition - 1].pop();
    if (boxContent) {
      part1Boxes[destination - 1].push(boxContent);
    }
  }
}

const message1 = getMessage(part1Boxes);
console.log("Answer for part 1:", message1);

// part 2
const part2Boxes = parseBoxChart(rows);

for (const { boxCount, initialPosition, destination } of parsedInstructions) {
  const movedBoxes = part2Boxes[initialPosition - 1].splice(
    part2Boxes[initialPosition - 1].length - boxCount,
    boxCount
  );
  part2Boxes[destination - 1].push(...movedBoxes);
}

const message2 = getMessage(part2Boxes);
console.log("Answer for part 2:", message2);
