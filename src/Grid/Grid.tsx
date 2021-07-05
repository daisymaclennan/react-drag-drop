import React, { useState, useEffect, useRef } from "react";
import arrayMove from "array-move";
import GridItem from "./GridItem";

interface Grid {
  columns: number;
  items: number[];
}

const Grid = ({ columns, items }) => {
  const ref = useRef(null);
  const [bounds, setBounds] = useState(null);
  const [columnWidth, setColumnWidth] = useState(0);
  const [itemOrder, setItemOrder] = useState(items);

  const remeasure = () => {
    if (ref.current) {
      console.log('remeasure')
      setBounds(ref.current.getBoundingClientRect());
    }
  };

  const updateItemOrder = (before: number, after: number) => {
    const newOrder = arrayMove(itemOrder, before, after);
    setItemOrder(newOrder);
  };

  useEffect(() => {
    remeasure();
    window.addEventListener("resize", remeasure);
    return () => window.removeEventListener("resize", remeasure);
  }, [ref]);

  useEffect(() => {
    setItemDims();
  }, [bounds]);

  const setItemDims = () => {
    const columnWidth = bounds?.width / columns;
    console.log('col width', columnWidth)
    setColumnWidth(columnWidth);
  };

  const getPos = (i: number) => {
    const row = Math.floor(i / columns);
    const column = i - row * columns;
    return [column * columnWidth, row * columnWidth];
  };

  const getIndexFromPos = (x: number, y: number) => {
    const column = Math.floor(x / columnWidth);
    const row = Math.floor(y / columnWidth);
    const maxRow = items.length / columns;
    const targetIndex = row * columns + column;

    if (targetIndex > items.length - 1 || row > maxRow) return items.length - 1;
    if (targetIndex < 0) return 0;
    return targetIndex;
  };

  return (
    <div ref={ref}>
      {items.map((item) => (
        <GridItem
          item={item}
          width={columnWidth}
          getIndexFromPos={getIndexFromPos}
          getPos={getPos}
          updateOrder={updateItemOrder}
          itemOrder={itemOrder}
        />
      ))}
    </div>
  );
};

export default Grid;
