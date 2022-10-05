import { JSX } from "preact";

export const Input = (props: JSX.HTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      class="border-1 border-dashed border-gray-200 bg-white p-2"
    />
  );
};
