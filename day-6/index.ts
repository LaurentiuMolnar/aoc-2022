const input = await Deno.readTextFile("./day-6/day6.in");

class RingBuffer<T> {
  size: number;
  values: Array<T>;

  constructor({ size }: { size: number }) {
    this.size = size;
    this.values = new Array(size);
  }

  push(...items: T[]): void {
    for (const item of items) {
      if (this.values.length === this.size) {
        this.values.shift();
      }
      this.values.push(item);
    }
  }

  allUnique(): boolean {
    if (this.values.length < this.size) return false;

    const s = [...new Set<T>(this.values).values()].filter(Boolean);

    return this.size === s.length;
  }
}

const buf1 = new RingBuffer<string>({ size: 4 });

let processedMarkers = 0;
for (const marker of input) {
  buf1.push(marker);
  processedMarkers++;

  if (buf1.allUnique()) {
    break;
  }
}

console.log(processedMarkers);

const buf2 = new RingBuffer<string>({ size: 14 });

let processedMarkers2 = 0;
for (const marker of input) {
  buf2.push(marker);
  processedMarkers2++;

  if (buf2.allUnique()) {
    break;
  }
}

console.log(processedMarkers2);
