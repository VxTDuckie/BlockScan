"use client";
import React from 'react'
import { CustomButtonProps } from '@/types';
const CustomButton = ({title, containerStyles, handleClick, icon}: CustomButtonProps) => {
  return (
    <button        
        disabled={false}
        type={"button"}
        className={`custom-btn ${containerStyles}`}
        onClick={handleClick}
        
    >
    <span className='flex items-center gap-2'>
        {title}
        {icon}
    </span>

    </button>
  )
}

export default CustomButton