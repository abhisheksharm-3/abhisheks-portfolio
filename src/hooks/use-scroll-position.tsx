"use client";
import { useState, useEffect } from "react";

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      setScrollPosition(window.scrollY);
      setScrollHeight(document.body.scrollHeight - window.innerHeight);
    };
    update(); // set initial values
    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { scrollPosition, scrollHeight };
}