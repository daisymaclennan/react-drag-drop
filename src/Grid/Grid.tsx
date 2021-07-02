import React, { useState, useEffect, useRef } from "react";
import GridItem from "./GridItem";

interface Grid {
    columns: number;
    items: number[];
}

const Grid = ({ columns, items }) => {
  const ref = useRef(null);

  const [bounds, setBounds] = useState(null);
  const [columnWidth, setColumnWidth] = useState(0);

  const remeasure = () => {
    if (ref.current) {
      setBounds(ref.current.getBoundingClientRect());
      console.log(ref.current.getBoundingClientRect());
    }
  };

  useEffect(() => {
    remeasure();
    window.addEventListener('resize', remeasure);
    return () => window.removeEventListener('resize', remeasure);
  }, [ref]);

  useEffect(() => {
    setItemDims();
  }, [bounds])

  const setItemDims = () => {
    const columnWidth = bounds?.width / columns;
    setColumnWidth(columnWidth)
  }

  const getPos = (i: number) => {
    const row = Math.floor(i / columns);
    const column = i - row * columns;
    return [column * columnWidth, row * columnWidth]
  };
  
  return (
    <div ref={ref}>
      {items.map((item, i) => (
        <GridItem width={columnWidth} pos={getPos(i)}  />
      ))}
    </div>
  );
};

export default Grid;
