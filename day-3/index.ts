const input = await Deno.readTextFile("./day-3/day3.in");

type Rucksack = [string, string];

const lines = input.split("\n").filter(Boolean);
const rucksacks: Array<Rucksack> = lines.map((l) => [
  l.slice(0, l.length / 2),
  l.slice(l.length / 2),
]);

const getItemPriority = (item: string) => {
  const lowercases = "abcdefghijklmnopqrstuvwxyz";
  const allChars = ` ${lowercases}${lowercases.toUpperCase()}`; // starting the string with a space to map each letter to its priority value (1-52)

  return allChars.indexOf(item);
};

const findCommonItem = ([first, second]: Rucksack) => {
  for (const c of first) {
    if (second.includes(c)) {
      return c;
    }
  }
  return null;
};

console.log(
  rucksacks
    .map(findCommonItem)
    .filter((s): s is string => s !== null)
    .map(getItemPriority)
    .reduce((sum, prio) => sum + prio, 0)
);

// part 2
type ElfGroup = [string, string, string];

const groups: Array<ElfGroup> = [];
for (let i = 0; i < lines.length; i += 3) {
  groups.push([lines[i], lines[i + 1], lines[i + 2]]);
}

const findBadgeItem = ([first, second, third]: ElfGroup) => {
  for (const c of first) {
    if (second.includes(c) && third.includes(c)) {
      return c;
    }
  }
  return null;
};

console.log(
  groups
    .map(findBadgeItem)
    .filter((s): s is string => s !== null)
    .map(getItemPriority)
    .reduce((sum, prio) => sum + prio, 0)
);
