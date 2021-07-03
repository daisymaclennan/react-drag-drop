import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface GridItemProps {
  item: number;
  width: number;
  pos: [number, number];
  getIndexFromPos: (x: number, y: number) => number;
  getPos: (i: number) => number[];
  updateOrder: (before: number, after: number) => void;
  itemOrder: number[];
}

const GridItem = ({
  item,
  width,
  pos,
  getIndexFromPos,
  getPos,
  updateOrder,
  itemOrder,
}: GridItemProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [index, setIndex] = useState(itemOrder.indexOf(item));
  const controls = useAnimation();

  const snapToNewPos = (i: number) => {
    const newPos = getPos(i);
    controls.start({
      x: `${newPos[0]}px`,
      y: `${newPos[1]}px`,
      transition: { duration: 1, type: "spring" },
    });
  };

  useEffect(() => {
    // Whenever the order of items changes move to the new position
    snapToNewPos(itemOrder.indexOf(item));
    setIndex(itemOrder.indexOf(item));
  }, [itemOrder]);

  return (
    <motion.div
      drag
      animate={controls}
      onDrag={(event, info) => {
        console.log("event:", event);
        console.log("info:", info);
        console.log(getIndexFromPos(info.point.x, info.point.y));
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event, info) => {
        const newIndex = getIndexFromPos(info.point.x, info.point.y);
        setIsDragging(false);
        updateOrder(index, newIndex);
        snapToNewPos(newIndex);
      }}
      whileTap={{
        scale: 1.1,
        zIndex: 3,
      }}
      className={isDragging ? "dragging" : ""}
      style={{
        background: "pink",
        width: `${width}px`,
        height: `${width}px`,
        position: "absolute",
        border: "1px solid green",
        zIndex: isDragging ? 3 : 1,
        scale: isDragging ? 1.1 : 1,
        x: pos[0],
        y: pos[1],
        transition: "scale 0.5s ease-in",
      }}
    >
      {item}
    </motion.div>
  );
};

export default GridItem;
