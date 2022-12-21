import { useEffect, useState } from "preact/hooks";
import { Input } from "../components/Input.tsx";

const formatNumber = (
  v: number,
  opts: {
    abs?: boolean;
    percent?: boolean;
  } = {
    abs: false,
    percent: false,
  }
) => {
  const temp = opts.abs ? Math.abs(v) : v;

  return temp.toFixed(2) + (opts.percent ? "%" : "");
};

const modelBalanced = (a: number, b: number, f: number) => {
  const diff = (a * f - b * f) / (2 * ((a * f + b * f) / 2));

  const fixA = f / 2 + (f / 2) * diff;
  const fixB = f / 2 - (f / 2) * diff;

  return {
    diff,
    fixA,
    fixB,
  };
};

const modelMin0 = (a: number, b: number, f: number) => {
  const diff = Math.max(-1, Math.min(1, (a / b - b / a) * 0.25));

  const fixA = Math.max(0, f / 2 + (f / 2) * diff);
  const fixB = Math.min(f, f / 2 - (f / 2) * diff);

  return {
    diff,
    fixA,
    fixB,
  };
};

const modelStandard = (a: number, b: number, f: number) => {
  const diff = (a / b - b / a) * 0.25;

  const fixA = f / 2 + (f / 2) * diff;
  const fixB = f / 2 - (f / 2) * diff;

  return {
    diff,
    fixA,
    fixB,
  };
};

export const Calculator = () => {
  const [fixCosts, setFixCosts] = useState(150);
  const [salaries, setSalaries] = useState<{ a: number; b: number }>({
    a: 200,
    b: 500,
  });
  const [result, setResult] = useState<{
    diff: [number, string];
    fixA: [number, string];
    fixB: [number, string];
  }>({
    diff: [0, ""],
    fixA: [0, ""],
    fixB: [0, ""],
  });

  const [calculationFn, setCalculationFn] = useState("standard");

  useEffect(() => {
    const { a, b } = salaries;

    let fn: typeof modelStandard = modelStandard;

    switch (calculationFn) {
      case "standard": {
        fn = modelStandard;

        break;
      }
      case "balanced": {
        fn = modelBalanced;

        break;
      }
      case "minmaxed": {
        fn = modelMin0;
      }
    }

    const { diff, fixA, fixB } = fn(a, b, fixCosts);

    setResult({
      diff: [diff, `(${a} / ${b} - ${b} / ${a}) * 0.25`],
      fixA: [
        fixA,
        `${fixCosts} / 2 + (${fixCosts} / 2) * ${diff.toPrecision(2)}`,
      ],
      fixB: [
        fixB,
        `${fixCosts} / 2 - (${fixCosts} / 2) * ${diff.toPrecision(2)}`,
      ],
    });
  }, [salaries, fixCosts, calculationFn]);

  const labels = [
    "FC/2",
    "A2",
    "B2",
    "Abs. Diff",
    "Diff",
    "A2 / A1",
    "B2 / B1",
  ];

  const maxPad = Math.max(...labels.map((d) => d.length)) + 2;

  return (
    <div>
      <div class="w-full flex justify-between">
        <label>Berechnung:</label>
        <select
          onChange={(e) => {
            const value = e.target?.value;

            setCalculationFn(value);
          }}
        >
          <option value="standard">Ausgleichend</option>
          <option value="balanced">Balancierend</option>
          <option value="minmaxed">Keine Negativen</option>
        </select>
      </div>
      <hr class="my-4" />
      <div class="flex flex-1 flex-col mb-4">
        <label htmlFor="salaryA">A1</label>
        <Input
          id="salaryA"
          type="number"
          value={salaries.a}
          onInput={(e) =>
            setSalaries({ ...salaries, a: parseInt((e.target as any).value) })
          }
        />
      </div>
      <div class="flex flex-1 flex-col mb-4">
        <label htmlFor="salaryB">B1</label>
        <Input
          id="salaryB"
          type="number"
          value={salaries.b}
          onInput={(e) =>
            setSalaries({ ...salaries, b: parseInt((e.target as any).value) })
          }
        />
      </div>
      <div class="flex flex flex-col">
        <label htmlFor="fixCosts">Fix Costs (FC)</label>
        <Input
          id="fixCosts"
          type="number"
          value={fixCosts}
          onInput={(e) => setFixCosts(parseInt((e.target as any).value))}
        />
      </div>
      <div class="my-8" />
      <code class="text-lg">
        <pre>
          <span>
            {labels[0].padEnd(maxPad)}={" "}
            {formatNumber(fixCosts / 2, { abs: true })}
          </span>
          <br />
          <span class="font-bold text-green-500">
            {labels[1].padEnd(maxPad)}= {formatNumber(result.fixA[0])} ={" "}
            {formatNumber((result.fixA[0] / fixCosts) * 100, {
              percent: true,
              abs: true,
            })}
          </span>
          <br />
          <span class="font-bold text-green-500">
            {labels[2].padEnd(maxPad)}= {formatNumber(result.fixB[0])} ={" "}
            {formatNumber((result.fixB[0] / fixCosts) * 100, {
              percent: true,
              abs: true,
            })}
          </span>
          <br />
          <span>
            {labels[3].padEnd(maxPad)}={" "}
            {formatNumber(fixCosts * result.diff[0], { abs: true })} ={" "}
            {formatNumber(result.diff[0] * 100, { abs: true, percent: true })}
          </span>
          <br />
          <span>
            {labels[4].padEnd(maxPad)}={" "}
            {formatNumber((fixCosts * result.diff[0]) / 2, { abs: true })} ={" "}
            {formatNumber((result.diff[0] * 100) / 2, {
              percent: true,
              abs: true,
            })}
          </span>
          <br />
          <span>
            {labels[5].padEnd(maxPad)}={" "}
            {formatNumber((result.fixA[0] / salaries.a) * 100, {
              abs: true,
              percent: true,
            })}
          </span>
          <br />
          <span>
            {labels[6].padEnd(maxPad)}={" "}
            {formatNumber((result.fixB[0] / salaries.b) * 100, {
              abs: true,
              percent: true,
            })}
          </span>
        </pre>
      </code>
      <br />

      <div class="text-blue-500 text-xs flex flex-col gap-2">
        <h3 class="text-underline mb-2">Hilfe</h3>
        <p>A1 = Available funds for A</p>
        <p>B1 = Available funds for B</p>
        <p>Fix Costs (FC) = Total costs</p>
        <p>FC/2 = Total Fix Costs divided by 2</p>
        <p>A2 = Pro rata cost of A</p>
        <p>B2 = Pro rata cost of B</p>
        <p>Abs. Diff = Total difference between pro ratas</p>
        <p>Diff = Actual difference between pro ratas</p>
        <p>A2 / A1 = Percentage A1 of A2</p>
        <p>B2 / B1 = Percentage B1 of B2</p>
      </div>
    </div>
  );
};

export default Calculator;
