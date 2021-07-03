import React, { useState } from "react";
import { motion } from "framer-motion";

interface GridItemProps {
  num: number;
  width: number;
  pos: [number, number];
  getIndexFromPos: (x: number, y: number) => void;
}

const GridItem = ({ num, width, pos, getIndexFromPos }: GridItemProps) => {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <motion.div
      drag
      onDrag={(event, info) => {
        console.log("event:", event);
        console.log("info:", info);
        console.log(getIndexFromPos(info.point.x, info.point.y));
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
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
      {num}
    </motion.div>
  );
};

export default GridItem;
