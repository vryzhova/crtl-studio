import React from 'react'

type TProps = {
    text: string,
}
export const Button: React.FC<TProps>  = ({text}) => {


    return (
        <button>{text}</button>
    )
}