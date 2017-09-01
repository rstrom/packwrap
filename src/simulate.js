import _ from 'lodash'
import echo from './echo'

function assignProps (params, state) {
  return  _(params)
    .map((v, k) => [k, echo(v, state)])
    .fromPairs()
    .value()
}

function simulate (SL, modules, components, to) {
  SL.reset()
  modules.slice(0, to)
    .reduce((data, m) => {
      console.log('sim', data)
      const component = components[m.component]
      component.defaultProps = component.defaultProps || {}
      const props = {
        ...assignProps(component.defaultProps, data),
        ...assignProps(m, data)
      }
      const response = component.hasOwnProperty('simulate') ?
        component.simulate(props) : {}
      SL.push(response, `Sim${m.component}`, true)
      return SL.getState().data
    }, {})
}

export default simulate
