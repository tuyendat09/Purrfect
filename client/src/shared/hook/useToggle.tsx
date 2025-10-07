"use client";

import { useState } from "react";

export default function useToggle() {
  const [toggle, setToggle] = useState<boolean>(false);
  function handleToggle() {
    setToggle((prevState) => !prevState);
  }
  return { toggle, handleToggle };
}
