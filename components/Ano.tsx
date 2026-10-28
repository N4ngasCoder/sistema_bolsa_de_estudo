"use client";

import { useEffect, useState } from "react";

export default function Ano() {
  const [ano, setAno] = useState<number | null>(null);
  useEffect(() => setAno(new Date().getFullYear()), []);
  return <>{ano ?? ""}</>;
}
