import { ReactNode } from "react";

interface RenderIfProps {
    condition: boolean;
    children: ReactNode;
}


export function RenderByCondition({ condition, children }: RenderIfProps) {


    return (
        <>
            {condition && (
                children
            )}
        </>
    )

} 