"use client";
import React, { useState } from "react";

const Button = () => {
  const [process, setProcess] = useState(false);
  return (
    <button className="p2 border rounded" onClick={() => setProcess(true)}>
      {process ? "Deleting" : "Delete"}
    </button>
  );
};

export default Button;
