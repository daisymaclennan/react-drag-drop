import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface GridItemProps {
  item: number;
  width: number;
  getIndexFromPos: (x: number, y: number) => number;
  getPos: (i: number) => number[];
  updateOrder: (before: number, after: number) => void;
  itemOrder: number[];
}

const GridItem = ({
  item,
  width,
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
    if (itemOrder.indexOf(item) !== index) {
      snapToNewPos(itemOrder.indexOf(item));
      setIndex(itemOrder.indexOf(item));
    }
  }, [itemOrder]);

  return (
    <motion.div
      drag
      animate={controls}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event, info) => {
        const newIndex = getIndexFromPos(info.point.x, info.point.y);
        setIsDragging(false);
        snapToNewPos(newIndex);
        updateOrder(index, newIndex);
      }}
      whileTap={{
        scale: 1.1,
        zIndex: 3,
      }}
      className={isDragging ? "dragging" : ""}
      style={{
        border: "1px solid green",
        background: "pink",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        color: "white",
        width: `${width}px`,
        height: `${width}px`,
        position: "absolute",
        zIndex: isDragging ? 3 : 1,
        scale: isDragging ? 1.1 : 1,
        /* x: getPos(index)[0],
        y: getPos(index)[1], */
      }}
    >
      {item}
    </motion.div>
  );
};

export default GridItem;
