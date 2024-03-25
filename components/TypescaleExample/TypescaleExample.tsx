import React from "react";

type Props = {};

const TypescaleExample = (props: Props) => {
  return (
    <div className="m-4">
      <div className="my-12 rounded-xl bg-zinc-100 p-4 text-zinc-500 lg:p-6">
        <div className="font-sans-xl mb-[1em]">About Typescale</div>
        <div className="font-sans-sm">
          Example Syntax: font-[sans/mono]-[size] <br />
          eg: font-mono-xs, font-sans-lg, font-sans-sm
          <br />
          size could be xs, sm, md, lg, xl, 2xl, 3xl, 4xl
        </div>
      </div>
      <div className="font-mono-xs my-4 opacity-50">font-sans-4xl</div>
      <div className="font-sans-4xl">
        Meet the world&apos;s most comprehensive digital clinic.
      </div>
      <div className="font-mono-xs my-4 opacity-50">font-sans-3xl</div>
      <div className="font-sans-3xl">A new era of personal health</div>
      <div className="font-mono-xs my-4 opacity-50">font-sans-2xl</div>
      <div className="font-sans-2xl">
        A revolutionary approach to health, combining leading doctors with the
        cutting edge of technology and medicine.
      </div>
      <div className="font-mono-xs my-4 opacity-50">font-sans-xl</div>
      <div className="font-sans-xl">
        The world&apos;s most advanced digital clinic for prevention,
        performance and longevity.
      </div>
      <div className="font-mono-xs my-4 opacity-50">font-sans-lg</div>
      <div className="font-sans-lg">
        A revolutionary approach to health, starting with over 60 advanced lab
        tests and a custom action plan.
      </div>
      <div className="font-mono-xs my-4 opacity-50">font-sans-md</div>
      <div className="font-sans-md">
        Leading doctors, whole-body testing, and the latest technology, like
        you&apos;ve never experienced before.
      </div>
      <div className="font-mono-xs my-4 opacity-50">font-mono-sm</div>
      <div className="font-mono-sm">
        Mono sm Leading doctors, whole-body testing, and the latest technology,
        like you&apos;ve never experienced before.
      </div>
      <div className="font-mono-xs my-4 opacity-50">font-mono-xs</div>
      <div className="font-mono-xs">
        Mono xs Leading doctors, whole-body testing, and the latest technology,
        like you&apos;ve never experienced before.
      </div>
    </div>
  );
};

export default TypescaleExample;
