import _ from 'lodash'
import echo from './echo'

function assignProps (params, state) {
  return  _(params)
    .map((v, k) => [k, echo(v, state)])
    .fromPairs()
    .value()
}

function simulateOver (state, modules, components, index=0) {
  if (!modules.length) {
    return state
  } else {
    const component = components[modules[0].component]
    component.defaultProps = component.defaultProps || {}
    const props = {
      ...assignProps(component.defaultProps, state),
      ...assignProps(modules[0], state)
    }
    const simulated = component.hasOwnProperty('simulate') ?
      component.simulate({ ...props, index }) : {}
    return simulateOver({...state, ...simulated, index: index + 1 }, modules.slice(1), components, index + 1)
  }
}

export default simulateOver
