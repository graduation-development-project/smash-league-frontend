import React from 'react'
import { Button } from '../ui/button'


const TextGradientBtn = ({textColor}: any) => {
    return (
        <div>
            <Button variant={"outline"} colorBtn={"whiteBtn"}>
                <span className={`bg-gradient-${textColor} bg-clip-text text-transparent`}>
                    Read more
                </span>
            </Button>
        </div>
    )
}

export default TextGradientBtn 