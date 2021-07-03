import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface GridItemProps {
  num: number;
  width: number;
  pos: [number, number];
  getIndexFromPos: (x: number, y: number) => number;
  getPos: (i: number) => [number, number];
}

const GridItem = ({
  num,
  width,
  pos,
  getIndexFromPos,
  getPos,
}: GridItemProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();

  const snapToNewPos = (i: number) => {
    const newPos = getPos(i);
    controls.start({
      x: `${newPos[0]}px`,
      y: `${newPos[1]}px`,
    });
  };
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
        setIsDragging(false);
        snapToNewPos(getIndexFromPos(info.point.x, info.point.y));
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
      {num}
    </motion.div>
  );
};

export default GridItem;
