import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/R3F/Scene"), {
  loading: () => <p>Loading...</p>,
});
``;

export default function Container() {
  return (
    <div className="relative h-screen w-screen">
      <Scene />
    </div>
  );
}
