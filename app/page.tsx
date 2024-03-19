// import Alert from ".././components/ExampleHeader";

// export default function Home() {
//   return (
//     <main className="">
//       <h1>Home</h1>
//     </main>
//   );
// }

import ListGroup from ".././components/JpegSequence";

function App() {
  let items = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
