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
      title: 'Survey',
      componentState: {}
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
      const browserHistory = this.state.data ?
        (this.state.data.browserHistory ? this.state.data.browserHistory : {}) : {}

      const mutations = this.state.data ?
        (this.state.data.mutations ? this.state.data.mutations : {}) : {}
      for (var k in backState.data) {
        if (this.state.data[k] !== backState.data[k] && k !== 'mutations') {
          console.log(k, this.state.data[k], backState.data[k])
          mutations[k] = {
            ...mutations[k],
            [Date.now()]: this.state.data[k]
          }
        }
      }

      this.setState({
        ...backState,
        data: {
          ...backState.data,
          mutations,
          browserHistory: {
            ...browserHistory,
            [Date.now()]: {
              pop: event.state
            }
          }
        }
      })
    }

    if (+params.simto) {
      this.simulateTo(params.simto, params)
    }

    if (params.index) {
      const backState = JSON.parse(sessionStorage.getItem(params.index))
      const browserHistory = this.state.data ?
        (this.state.data.browserHistory ? this.state.data.browserHistory : {}) : {}
      this.setState({
        ...backState,
        data: {
          ...backState.data,
          browserHistory: {
            ...browserHistory,
            [Date.now()]: {
              load: params.index
            }
          }
        }
      })
    }
  }

  componentDidMount () {
    document.title = this.state.title
    history.pushState(this.state.index, this.state.title, location.search)
    sessionStorage.setItem(this.state.index, JSON.stringify(this.state))
    ;(async () => {
      if (!this.state.data.endpoint) {
        console.log('Warning! No endpoint')
      } else if (!this.state.data.fireKey) {
        try {
          const endpoint = echo(this.state.data.endpoint, this.state.data)
          const fireKey = await firePush(endpoint, this.state.data.fireKey, this.state.data)
          this.setState({
            data: {
              ...this.state.data,
              fireKey
            }
          })
        } catch (e) {
          console.error(e)
          this.setState({
            data: {
              ...this.state.data,
              firefail: true
            }
          })
        }
      }
    })()
  }

  push = (response) => {
    const index = this.state.index + 1
    const mutations = this.state.data ?
      (this.state.data.mutations ? this.state.data.mutations : {}) : {}
    for (var k in response) {
      if (k in this.state.data) {
        mutations[k] = {
          ...mutations[k],
          [Date.now()]: this.state.data[k]
        }
      }
    }
    const newData = {
      ...response,
      [`module_${this.state.index}_t`]: Date.now(),
      [`module_${this.state.index}_component`]: this.props.modules[this.state.index].component
    }
    this.setState((state) => ({
      data: {
        ...state.data,
        ...newData,
        mutations
      },
      componentState: {},
      index
    }), () => {
      document.querySelector('.main').scrollTop = 0
      history.pushState(this.state.index, this.state.title, `?index=${this.state.index}`)
      sessionStorage.setItem(this.state.index, JSON.stringify(this.state))
      const endpoint = echo(this.state.data.endpoint, this.state.data)
      try {
        firePush(endpoint, this.state.data.fireKey, newData, index)
      } catch (e) {
        console.error(e)
        this.setState({
          data: {
            ...this.state.data,
            firefail: true
          }
        })
      }
    })
  }

  renderlessPush = (response) => {
    const index = this.state.index + 1
    const mutations = this.state.data ?
      (this.state.data.mutations ? this.state.data.mutations : {}) : {}
    for (var k in response) {
      if (k in this.state.data) {
        mutations[k] = {
          ...mutations[k],
          [Date.now()]: this.state.data[k]
        }
      }
    }
    const newData = {
      ...response,
      [`module_${this.state.index}_t`]: Date.now(),
      [`module_${this.state.index}_component`]: this.props.modules[this.state.index].component
    }
    this.setState((state) => ({
      data: {
        ...state.data,
        ...newData,
        mutations
      },
      index
    }), () => {
      try {
        const endpoint = echo(this.state.data.endpoint, this.state.data)
        firePush(endpoint, this.state.data.fireKey, newData, index)
      } catch (e) {
        console.error(e)
        this.setState({
          data: {
            ...this.state.data,
            firefail: true
          }
        })
      }
    })
  }

  set = (data) => {
    this.setState((state) => ({
      componentState: {
        ...state.componentState,
        ...data
      }
    }))
  }

  simulateTo = (index, withData) => {
    this.setState((state) => {
      const { modules, components } = this.props
      const simulated = simulateOver(state.data, modules.slice(0, index), components)
      return {
        data: {
          ...simulated,
          ...withData
        },
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
        ...componentState,
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
        this.state.data.fireKey ?
          (
            <Component
              {...props}
              key={index}
              index={index}
              data={this.state.data}
              set={this.set}
              push={this.push}
              renderlessPush={this.renderlessPush}
            />
          ) : (
            <p>Initializing...</p>
          )
      }
      </Wrapper>
    )
  }
}
