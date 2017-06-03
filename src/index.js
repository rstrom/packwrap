// @flow
import React from 'react'
import { render } from 'react-dom'
import Container from './Container'
import 'whatwg-fetch'

export const pack = (components: Object) =>
  (
    state: Object,
    modules: Array<Object>,
    elementId: String,
    wrapper: Object
  ) => {
    render(
      <Container
        components={components}
        state={state}
        modules={modules}
        wrapper={wrapper}
      />,
      document.getElementById(elementId)
    )
  }
