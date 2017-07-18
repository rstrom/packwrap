import _ from 'lodash'

export default (index) => {
  const initial = JSON.parse(sessionStorage.getItem('initial')) || {}
  const data = _.range(Number(index) + 1)
    .map((i) => JSON.parse(sessionStorage.getItem(i)).data)
    .reduce(
      (a, b) => Object.assign(a, b),
      {
        ...initial,
        fireKey: sessionStorage.getItem('fireKey'),
        index: Number(index)
      }
    )
  return {
    componentState: JSON.parse(sessionStorage.getItem(index)).componentState,
    index,
    data
  }
}
