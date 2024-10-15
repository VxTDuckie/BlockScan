"use client";
import React from 'react'
import { CustomButtonProps } from '@/types';
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