import React from 'react'
import { Button } from './Button'
import { Fullscreen } from './components/Fullscreen'
import { TouchTest } from './components/TouchTest'
import { Style } from './Style'

export const Page: React.FC = () => {
    return (
        <Style>
            <Fullscreen>
                <Button></Button>
                <TouchTest />
            </Fullscreen>
        </Style>
    )
}
