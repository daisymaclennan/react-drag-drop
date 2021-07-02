import React from "react";

interface GridItemProps {
  width: number;
  pos: [number, number];
}

const GridItem = ({ width, pos }: GridItemProps) => {
  return <div style={{ background: "pink", width: `${width}px`, height: `${width}px`, transform: `translateX(${pos[0]}px) translateY(${pos[1]}px)`, position: 'absolute', border: '1px solid green' }}>Grid item</div>;
};

export default GridItem;
