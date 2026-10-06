import { useEffect, useState } from "react";

export function useLocalTime(timeZone: string): string {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone,
      }).format(new Date());

    const first = setTimeout(() => setTime(format()), 0);
    const id = setInterval(() => setTime(format()), 30000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [timeZone]);

  return time;
}