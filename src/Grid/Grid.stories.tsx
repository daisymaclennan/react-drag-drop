import React from "react";
import Grid from './Grid';

export default {
  title: "Grid"
};

export const Three = () => <Grid columns={3} items={[0, 1, 2, 3, 4, 5, 6, 7]} />;

export const Four = () => <Grid columns={4} items={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]} />;

export const Five = () => <Grid columns={5} items={[0, 1, 2, 3, 4, 5, 6, 7]} />;
