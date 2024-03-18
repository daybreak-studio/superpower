import { MouseEvent, useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // useState to alter active index

  //const handleClick = (event: MouseEvent) => console.log(event.clientX);
  function handleTest(item: string, event: MouseEvent, index: number) {
    console.log(event.clientX);
    setHoveredIndex(index);
    onSelectItem(item);
  }

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            className={
              hoveredIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={(event) => handleTest(item, event, index)} // Fix: Pass both item, event, and index parameters to handleTest
            //onMouseLeave={() => setHoveredIndex(null)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
