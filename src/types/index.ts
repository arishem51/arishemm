import React from "react";

export type PortfolioType =
  | "about"
  | "resume"
  | "work"
  | "experience"
  | "contact";

export type AnimationType = "expand" | "slideUp";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
