function mung (data) {
  for (let k in data) {
    if (/[\$#[\]\/\.]/.test(k)) {
      const clean = k.replace(/[\$#[\]\/\.]/g, '*')
      console.log(`Changed ${k} to ${clean}`)
      data[clean] = data[k]
      delete data[k]
    }

    if (typeof data[k] === 'object') {
      data[k] = mung(data[k])
    }
  }
  return data
}

export default async (endpoint, data={}, index) => {
  // key : null | 'FETCHING' | '-ORDERED_HASH'
  const key = sessionStorage.getItem('key')
  const cleanData = mung(JSON.parse(JSON.stringify(data)))

  if (key && key !== 'FETCHING') {
    const put = await fetch(`${endpoint}/${key}/${index}.json`, {
      method: 'PUT',
      body: JSON.stringify({
        ...cleanData,
        timestamp: {
          '.sv': 'timestamp'
        }
      })
    })
  } else if (key === 'FETCHING') {
    let q = JSON.parse(sessionStorage.getItem('queue')) || []
    sessionStorage.setItem(
      'queue',
      JSON.stringify(
        q.concat({
          data: cleanData,
          index
        })
      )
    )
  } else {
    sessionStorage.setItem('key', 'FETCHING')
    const post = await fetch(`${endpoint}.json`, {
      method: 'POST',
      body: JSON.stringify({
        [index]: {
          ...cleanData,
          timestamp: {
            '.sv': 'timestamp'
          }
        }
      })
    })
    const { name } = await post.json()
    sessionStorage.setItem('key', name)
    let q = JSON.parse(sessionStorage.getItem('queue')) || []
    q.map((r) => fetch(
      `${endpoint}/${name}/${r.index}.json`,
      {
        method: 'PUT',
        body: JSON.stringify({
          ...r.data,
          timestamp: {
            '.sv': 'timestamp'
          }
        })
      }
    ))
  }
}
