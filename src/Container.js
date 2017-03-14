import React from 'react'
import _ from 'lodash'
import echo from './echo'
import simulateOver from './simulateOver'
import firePush from './firePush'
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

  constructor () {
    super()
    this.state = {
      index: 0,
      title: 'Survey'
    }
  }

  componentWillMount () {
    const params = _(location.search.slice(1).split('&'))
      .map((item) => item.split('='))
      .fromPairs()
      .value()

    this.setState({
      data: {
        start: Date.now(),
        endpoint: null,
        ...this.props.state,
        ...params
      }
    })

    window.onpopstate = (event) => {
      const backState = JSON.parse(sessionStorage.getItem(event.state))
      this.setState(backState)
    }

    if (+params.simto) {
      this.simulateTo(params.simto)
    }

    if (params.index) {
      const backState = JSON.parse(sessionStorage.getItem(params.index))
      this.setState(backState)
    }
  }

  componentDidMount () {
    document.title = this.state.title
    history.pushState(this.state.index, this.state.title, location.search)
    sessionStorage.setItem(this.state.index, JSON.stringify(this.state))
  }

  push = (response) => {
    this.setState((state) => ({
      data: {
        ...state.data,
        ...response,
        [`module_${this.state.index}_t`]: Date.now(),
        [`module_${this.state.index}_component`]: this.props.modules[this.state.index].component
      },
      componentState: {},
      index: state.index + 1
    }), () => {
      document.querySelector('.main').scrollTop = 0
      history.pushState(this.state.index, this.state.title, `?index=${this.state.index}`)
      sessionStorage.setItem(this.state.index, JSON.stringify(this.state))
      const endpoint = echo(this.state.data.endpoint, this.state.data)
      ;(async () => {
        const fireKey = await firePush(endpoint, this.state.fireKey, this.state.data)
        this.setState({ fireKey })
      })()
    })
  }

  renderlessPush = (response) => {
    this.setState((state) => ({
      data: {
        ...state.data,
        ...response,
        [`module_${this.state.index}_t`]: Date.now(),
        [`module_${this.state.index}_component`]: this.props.modules[this.state.index].component
      },
      index: state.index + 1
    }))
  }

  set = (data) => {
    this.setState((state) => ({
      componentState: {
        ...state.componentState,
        ...data
      }
    }))
  }

  simulateTo = (index) => {
    this.setState((state) => {
      const { modules, components } = this.props
      const simulated = simulateOver(state.data, modules.slice(0, index), components)
      return {
        data: simulated,
        index: simulated.index
      }
    })
  }

  render () {
    const {
      components,
      modules,
      state,
      wrapper
    } = this.props
    const { index, componentState } = this.state

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
        ...componentState
      }, {
        ...state,
        ...this.state.data,
        ...componentState
      })
    }

    const Wrapper = wrapper || Wrap

    return (
      <Wrapper
        state={this.state}
        length={modules.length}
        set={this.setState}
        simulatePush={() => this.push(Component.simulate(props))}
      >
        <Component
          {...props}
          key={index}
          set={this.set}
          push={this.push}
          renderlessPush={this.renderlessPush}
        />
      </Wrapper>
    )
  }
}
