import { MouseEventHandler, ReactNode  } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?:
    MouseEventHandler<HTMLButtonElement>;
    icon?: ReactNode;
    href?:{};
    download?: string;
    style?:{}
}
