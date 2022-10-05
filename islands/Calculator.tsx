import { useEffect, useState } from "preact/hooks";
import { Input } from "../components/Input.tsx";

export const Calculator = () => {
  const [fixCosts, setFixCosts] = useState(500);
  const [salaries, setSalaries] = useState<{ a: number; b: number }>({
    a: 100,
    b: 100,
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

    const fixA = fixCosts / 2 - (fixCosts / 2) * diff;
    const fixB = fixCosts / 2 + (fixCosts / 2) * diff;

    setResult({
      diff: [diff, `(${a} / ${b} - ${b} / ${a}) * 0.25`],
      fixA: [
        fixA,
        `${fixCosts} / 2 - (${fixCosts} / 2) * ${diff.toPrecision(2)}`,
      ],
      fixB: [
        fixB,
        `${fixCosts} / 2 + (${fixCosts} / 2) * ${diff.toPrecision(2)}`,
      ],
    });
  }, [salaries, fixCosts]);

  return (
    <div>
      <div class="flex flex-1 flex-col mb-4">
        <label htmlFor="salaryA">A</label>
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
        <label htmlFor="salaryB">B</label>
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
        <label htmlFor="fixCosts">Fix Costs</label>
        <Input
          id="fixCosts"
          type="number"
          value={fixCosts}
          onInput={(e) => setFixCosts(parseInt((e.target as any).value))}
        />
      </div>
      <div class="my-8" />
      <code class="text-sm">
        <pre>
          <span>Diff = {result.diff[0]}</span>
          <br />
          <span>
            A {"   "}= {result.fixA[0].toFixed(2)}
          </span>
          <br />
          <span>
            B {"   "}= {result.fixB[0].toFixed(2)}
          </span>
        </pre>
      </code>
    </div>
  );
};

export default Calculator;
