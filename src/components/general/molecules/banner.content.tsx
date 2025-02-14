import { Button } from '@/components/ui/button'
import React from 'react'
import TextGradientBtn from '../atoms/text.gradient.btn'

const BannerContent = ({ buttonColor }: { buttonColor: string }) => {
    return (
        <div className='w-full h-full flex flex-col justify-center gap-5'>
            <div className='flex flex-col gap-3 text-white'>
                <h1 className='text-2xl font-bold'>Take Your Badminton Journey to the Next Level</h1>
                <h3 className='text-lg font-medium'>
                    Join BadmintonHub today to transform your experience—whether you're organizing tournaments, officiating as a referee, or
                    stepping onto the court as a player. We've got everything
                    you need to thrive in the badminton community.
                </h3>
            </div>
            <div className='flex flex-row gap-5  '>
                <Button size={"lg"} colorBtn={"gradientGreenBtn"}>Join Now</Button>
                <TextGradientBtn size='lg'  textColor={buttonColor}  >Read more</TextGradientBtn>
            </div>
        </div>
    )
}

export default BannerContent