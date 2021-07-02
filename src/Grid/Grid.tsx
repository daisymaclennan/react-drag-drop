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

  const getIndexFromPos = (x: number, y: number) => {
    const column = Math.floor(x / columnWidth);
    const row = Math.floor(y / columnWidth);
    const maxRow = items.length / columns;
    const targetIndex = (row * columns) + column;
    
    if(targetIndex > items.length - 1 || row > maxRow) return items.length - 1;
    return targetIndex;
  }

  return (
    <div ref={ref}>
      {items.map((item, i) => (
        <GridItem num={item} width={columnWidth} pos={getPos(i)} getIndexFromPos={getIndexFromPos}  />
      ))}
    </div>
  );
};

export default Grid;
