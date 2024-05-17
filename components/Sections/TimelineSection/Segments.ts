import { parseSVG } from "svg-path-parser";

export type Waypoint = {
  age: string;
  action: string;
  details: string[];
  direction: "left" | "right";
};
export type TimlineSegment = {
  path: string;
  waypoints: Waypoint[];
};

export type TimlineSegmentInfo = TimlineSegment & {
  head: { x: number; y: number };
  tail: { x: number; y: number };
  length: number;
};

export function getSegmentInfo(segment: TimlineSegment): TimlineSegmentInfo {
  const svgCommands = parseSVG(segment.path);

  const head = (() => {
    const firstCommand = svgCommands[0];
    if (firstCommand.code !== "M") return { x: 0, y: 0 };
    return {
      x: firstCommand.x,
      y: firstCommand.y,
    };
  })();

  const tail = (() => {
    const lastCommand = svgCommands[svgCommands.length - 1];
    if (lastCommand.code !== "C") return { x: 0, y: 0 };
    return {
      x: lastCommand.x,
      y: lastCommand.y,
    };
  })();

  const length = (() => {
    // calculate the length
    let l = 0;
    let penPos = { x: 0, y: 0 };
    svgCommands.forEach((command) => {
      // move to the point for move command
      if (command.code === "M") {
        // the current point
        penPos.x = command.x;
        penPos.y = command.y;
        return;
      }

      // when it is drawn as cubic bezier mode
      if (command.code === "C") {
        const p0 = penPos;
        const cp1 = { x: command.x1, y: command.y1 };
        const cp2 = { x: command.x2, y: command.y2 };
        const p = { x: command.x, y: command.y };

        // accumulate the distancd
        l += cubicBezierLength(p0, cp1, cp2, p, 1);

        // update the pen position
        penPos.x = command.x;
        penPos.y = command.y;
      }
    });

    return l;
  })();

  return {
    head,
    tail,
    length,
    path: segment.path,
    waypoints: segment.waypoints,
  };
}

/**
 * Based on snap.svg bezlen() function
 * https://github.com/adobe-webplatform/Snap.svg/blob/master/dist/snap.svg.js#L5786
 */
type Point = {
  x: number;
  y: number;
};

function cubicBezierLength(p0: Point, cp1: Point, cp2: Point, p: Point, t = 1) {
  if (t === 0) {
    return 0;
  }
  const base3 = (t: number, p1: number, p2: number, p3: number, p4: number) => {
    let t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
      t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
    return t * t2 - 3 * p1 + 3 * p2;
  };
  t = t > 1 ? 1 : t < 0 ? 0 : t;
  let t2 = t / 2;
  let Tvalues = [
    -0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041,
    0.9041, -0.9816, 0.9816,
  ];
  let Cvalues = [
    0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069,
    0.1069, 0.0472, 0.0472,
  ];

  let n = Tvalues.length;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    let ct = t2 * Tvalues[i] + t2,
      xbase = base3(ct, p0.x, cp1.x, cp2.x, p.x),
      ybase = base3(ct, p0.y, cp1.y, cp2.y, p.y),
      comb = xbase * xbase + ybase * ybase;
    sum += Cvalues[i] * Math.sqrt(comb);
  }
  return t2 * sum;
}
