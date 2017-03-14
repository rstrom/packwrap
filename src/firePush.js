export default async (endpoint, key, data) => {
  if (!key) {
    const post = await fetch(`${endpoint}.json`, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        timestamp: {
          '.sv': 'timestamp'
        }
      })
    })
    const { name } = await post.json()
    return name
  } else {
    const put = await fetch(`${endpoint}/${key}.json`, {
      method: 'PUT',
      body: JSON.stringify({
        ...data,
        timestamp: {
          '.sv': 'timestamp'
        }
      })
    })
    return key
  }
}
