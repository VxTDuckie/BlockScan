import React from "react";
import { cn } from "@/lib/utils";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-0 left-0 h-0.5 w-0.5 rounded-full",
            "bg-primary-red shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-1/2 before:w-12 before:h-px before:bg-gradient-to-r before:from-pink-600 before:to-transparent",
            className
          )}
          style={{
            top: 0,  // Trải dài theo chiều dọc
            left: `${Math.floor(Math.random() * 100)}%`,  // Trải dài theo chiều ngang
            animationDelay: `${Math.random() * 0.6 + 0.2}s`,
            animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
            zIndex: 0,
          }}
        ></span>
      ))}
    </>
  );
};