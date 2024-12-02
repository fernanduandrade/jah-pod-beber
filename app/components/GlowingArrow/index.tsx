import React from 'react'

type GlowingArrowProps = {
    invert?: boolean
}

export const GlowingArrow = (props: GlowingArrowProps) => {
    return (
        <div className={`wrapper ${props.invert ? 'rotate-180' : ''}`}>
            <i className="zmdi zmdi-chevron-right"></i>
            <i className="zmdi zmdi-chevron-right"></i>
            <i className="zmdi zmdi-chevron-right"></i>
        </div>
    )
}