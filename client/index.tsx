import { setBackend } from '@tensorflow/tfjs'
import React from 'react'
import ReactDOM from 'react-dom'
import { Page } from './Page'

setBackend('cpu')

const root = document.getElementById('root')
ReactDOM.render(<Page />, root)
