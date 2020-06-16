import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { CameraTest } from './components/CameraTest'
import { Fullscreen } from './components/Fullscreen'
import { TouchTest } from './components/TouchTest'
import { withPointersProvider } from './contexts/Pointers'
import { colors } from './guidelines/colors'
import { Style } from './Style'

const PointersProvider = withPointersProvider('div')

const Background = styled(Fullscreen)({
    background: colors.dark[3],
})

export const Page: React.FC = () => {
    return (
        <Style>
            <Background>
                <PointersProvider onClick={() => console.log('a')}>
                    <Button></Button>
                </PointersProvider>
                <PointersProvider>
                    <CameraTest />
                </PointersProvider>
                <PointersProvider>
                    <TouchTest />
                </PointersProvider>
            </Background>
        </Style>
    )
}
