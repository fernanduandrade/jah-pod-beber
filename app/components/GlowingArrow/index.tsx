import React from 'react'

type GlowingArrowProps = {
    invert?: boolean
}

export const GlowingArrow = (props: GlowingArrowProps) => {
    return (
        <div className={`wrapper ${props.invert ? 'rotate-180' : ''}`}>
            <i className="sm:text-[10px] md:text-[20[px] lg:text-[40px] sm:ml-2 md:ml-4 lg:ml-6 zmdi zmdi-chevron-right"></i>
            <i className="sm:text-[10px] md:text-[20[px] lg:text-[40px] sm:ml-2 md:ml-4 lg:ml-6 zmdi zmdi-chevron-right"></i>
            <i className="sm:text-[10px] md:text-[20[px] lg:text-[40px] sm:ml-2 md:ml-4 lg:ml-6 zmdi zmdi-chevron-right"></i>
        </div>
    )
}