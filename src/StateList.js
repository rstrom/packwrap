import echo from './echo'
import record from './record'

function fold (list, prop, init) {
  return list.reduce((a, b) => {
    return Object.assign(a, prop ? b[prop] : b)
  }, init || {})
}

export default class StateList {
  constructor (initial) {
    this.initial = initial
    this.state = [{
      data: [],
      screenState: []
    }]
    this.index = 0
    this.publish = () => null
  }

  init () {
    // page reload
    const reload = JSON.parse(sessionStorage.getItem('StateList'))
    if (reload) {
      this.index = reload.index
      this.state = reload.state
      this.publish()
    }

    // no key for db
    if (!sessionStorage.getItem('key')) {
      ;(async () => {
        try {
          const endpoint = echo(this.initial.endpoint, this.initial)
          await record(endpoint, this.initial, 'initial')
          this.publish()
        } catch (e) {
          this.initial = {
            ...this.initial,
            fail: true
          }
        }
      })()
    }

    history.replaceState(this.index, null, `?index=${this.index}`)
    window.onpopstate = (event) => {
      // prevent going back before max
      const max = sessionStorage.getItem('max')
      if (Number(event.state) > Number(max)) {
        this.index = event.state
        this.publish()
      }
    }
  }

  set (screenState) {
    this.state[this.index] = {
      ...this.state[this.index],
      screenState: this.state[this.index].screenState
        .concat({
          ...screenState,
          timestamp: Date.now()
        })
    }
    this.publish()
  }

  push (data, component, silent=false) {
    this.state[this.index].data = this.state[this.index].data
      .concat({
        ...data,
        [`module_${this.index}_component`]: component,
        [`module_${this.index}_t`]: Date.now()
      })
    this.state[this.index].silent = silent

    ;(async () => {
      try {
        const endpoint = echo(this.initial.endpoint, this.initial)
        await record(endpoint, this.state[this.index], this.index)
      } catch (e) {
        this.initial = {
          ...this.initial,
          fail: true
        }
      }
    })()

    this.index += 1
    if (!this.state[this.index]) {
      this.state[this.index] = {
        data: [],
        screenState: []
      }
    }
    if (!silent) history.pushState(this.index, null, `?index=${this.index}`)
    history.replaceState(this.index, null, `?index=${this.index}`)
    this.publish()
  }

  getState () {
    const key = sessionStorage.getItem('key')
    const initial = Object.assign(this.initial, { key })
    const datas = this.state
      .slice(0, this.index)
      .map((s) => fold(s.data))
    return {
      index: this.index,
      data: fold(datas, null, initial),
      screenState: fold(this.state[this.index].screenState)
    }
  }

  subscribe (callback) {
    this.publish = () => {
      const state = this.getState()
      callback(state)

      // save for page reload
      sessionStorage.setItem(
        'StateList',
        JSON.stringify({
          state: this.state,
          index: this.index
        })
      )
    }
    this.init()
  }

  reset () {
    this.state = [{
      data: [],
      screenState: []
    }]
    this.index = 0
  }
}
