// @flow
import _ from 'lodash'
import React from 'react'

export default (statics: Array<Object>, components: Object) => {
  return statics
    .filter((q) => _.has(components, q.component))
    .map((q, i) => {
      const Q = components[q.component]
      return <Q {...q} key={i} />
    })
}
