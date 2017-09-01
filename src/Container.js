import React from 'react'
import _ from 'lodash'
import echo from './echo'
import simulate from './simulate'
import StateList from './StateList'
window.React = React

const Wrap = ({ children }) => (
  <div>{children}</div>
)

export default class Container extends React.Component {

  static defaultProps = {
    state: {},
    modules: [],
    components: {}
  }

  constructor (props) {
    super(props)
    const params = _(location.search.slice(1).split('&'))
      .map((item) => item.split('='))
      .fromPairs()
      .value()

    if (!params.index) sessionStorage.clear()

    const initial = {
      start: Date.now(),
      endpoint: null,
      ...props.state,
      ...params
    }
    document.title = initial.title || 'Survey'

    this.SL = new StateList(initial)
    this.state = {
      ...this.SL.getState(),
      params
    }
    this.push = this.push.bind(this)
  }

  componentWillMount () {
    this.SL.subscribe((state) => this.setState(state))
  }

  componentDidMount () {
    const { modules, components } = this.props
    const { params } = this.state

    if (+params.simto) simulate(this.SL, modules, components, +params.simto)
  }

  push = (response, silent) => {
    if (!silent) document.querySelector('.main').scrollTop = 0
    this.setState({ wrapWidth: null })
    const { components, modules } = this.props
    const index = this.state.index
    this.SL.push(response, modules[index].component, silent)
  }

  set = (screenState) => {
    this.SL.set(screenState)
  }

  render () {
    const {
      components,
      modules,
      state,
      wrapper
    } = this.props
    const { index, screenState } = this.state

    const key = sessionStorage.getItem('key')

    if (index >= modules.length) {
      return (
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
      )
    } else if (!components.hasOwnProperty(modules[index].component)) {
      return (
        <pre>Error: could not find component {modules[index].component}</pre>
      )
    }

    const Component = components[modules[index].component]
    const props = {
      ...echo({
        ...Component.defaultProps,
        ...modules[index],
        ...screenState
      }, {
        ...state,
        ...this.state.data,
        ...screenState,
      })
    }

    const Wrapper = wrapper || Wrap

    return (
      <Wrapper
        state={this.state}
        length={modules.length}
        simulatePush={() => this.push(Component.simulate(props))}
      >
      {
        key ?
          (
            <Component
              {...props}
              key={index}
              index={index}
              data={this.state.data}
              set={this.set}
              push={this.push}
              setWrapWidth={(wrapWidth) => this.setState({ wrapWidth })}
            />
          ) : (
            <p>Initializing...</p>
          )
      }
      </Wrapper>
    )
  }
}
