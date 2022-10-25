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

  useEffect(() => {
    const { a, b } = salaries;

    const diff = a > 0 || b > 0 ? (a / b - b / a) * 0.25 : 0;

    const fixA = fixCosts / 2 + (fixCosts / 2) * diff;
    const fixB = fixCosts / 2 - (fixCosts / 2) * diff;

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
  }, [salaries, fixCosts]);

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
        <h3 class="text-underline mb-2">Help</h3>
        <p>A1 = Available funds for A</p>
        <p>B1 = Available funds for B</p>
        <p>Fix Costs (FC) = Total costs</p>
        <p>50/50 = Total Fix Costs divided by 2</p>
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
