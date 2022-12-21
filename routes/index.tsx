import { Calculator } from "../islands/Calculator.tsx";

export default function Home() {
  return (
    <div class="w-screen">
      <div class="p-4 mx-auto max-w-sm">
        <h1 class="font-bold text-gray-800 text-xl">Calculator</h1>
        <hr class="my-4" />
        <Calculator />
      </div>
    </div>
  );
}
