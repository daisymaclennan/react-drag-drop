import React from "react";
import { motion } from "framer-motion";

interface GridItemProps {
  num: number;
  width: number;
  pos: [number, number];
  getIndexFromPos: (x: number, y: number) => void;
}

const GridItem = ({ num, width, pos, getIndexFromPos }: GridItemProps) => {
  return (
    <motion.div
      drag
      onDrag={(event, info) => {
        console.log("event:", event);
        console.log("info:", info);
        console.log(getIndexFromPos(info.point.x, info.point.y));
      }}
      style={{
        background: "pink",
        width: `${width}px`,
        height: `${width}px`,
        position: "absolute",
        border: "1px solid green",
        x: pos[0],
        y: pos[1],
      }}
    >
      {num}
    </motion.div>
  );
};

export default GridItem;
