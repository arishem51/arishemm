import React from "react";

export type PortfolioType =
  | "about"
  | "resume"
  | "project"
  | "experience"
  | "contact";

export type AnimationType = "expand" | "slideUp";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type Coordinates = {
  x: number;
  y: number;
};
