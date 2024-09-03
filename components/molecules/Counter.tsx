"use client";

import { useState } from "react";
import { Button } from "../ui";

export type CounterProps = {
  users: any[];
};

export const Counter: React.FC<CounterProps> = ({ users }) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>There are {users?.length} users</p>
      <Button onClick={() => setCount((c) => c + 1)}>{count}</Button>
    </div>
  );
};
