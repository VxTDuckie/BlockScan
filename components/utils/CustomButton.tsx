"use client";
import React from 'react'
import { MouseEventHandler, ReactNode  } from "react";

interface CustomButtonProps {
  title: React.ReactNode | string;
  containerStyles?: string;
  handleClick?:
  MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  href?:{};
  download?: string;
  style?:{};
}

const CustomButton = ({title, containerStyles, style, handleClick, icon}: CustomButtonProps) => {
  return (
    <button        
        disabled={false}
        type={"button"}
        className={` ${containerStyles}`}
        onClick={handleClick}
        
    >
    <span className={`flex items-center gap-2 ${style}`}>
        {title}
        {icon}
    </span>

    </button>
  )
}

export default CustomButton