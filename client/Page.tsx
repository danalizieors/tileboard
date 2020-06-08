import React from 'react'
import { Button } from './Button'
import { Fullscreen } from './components/Fullscreen'
import { TouchTest } from './components/TouchTest'
import { withPointersProvider } from './contexts/Pointers'
import { Style } from './Style'

const PointersProvider = withPointersProvider('div')

export const Page: React.FC = () => {
    return (
        <Style>
            <Fullscreen>
                <PointersProvider onClick={() => console.log('a')}>
                    <Button></Button>
                </PointersProvider>
                <PointersProvider>
                    <TouchTest />
                </PointersProvider>
            </Fullscreen>
        </Style>
    )
}
