import _ from 'lodash'

function echo (prop, env) {
  switch (true) {
    case Array.isArray(prop):
      return prop.map(p => echo(p, env))

    case typeof prop === 'object':
      return _(prop)
        .map((v, k) => [k, echo(v, env)])
        .fromPairs()
        .value()

    case /\${.+?}/.test(prop):
      // replace ${foo} with env[foo]
      const p = prop.replace(/\${(.+?)}/, (m, p1) => env[p1])
      return echo(p, env)

    case /^\$(\w|_).*/.test(prop):
      return env.hasOwnProperty(prop.substring(1)) ?
        echo(env[prop.substring(1)], env) : prop

    default:
      return prop
  }
}

export default echo
