import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { split } from "three/src/nodes/tsl/TSLCore.js";

export const Galaxy = () => {
  const [galaxy, setGalaxy] = useState({
    count: 10000,
    size: 0.01,
    radius: 5,
    branches: 3,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
  });
    const pointsRef = useRef();

}
