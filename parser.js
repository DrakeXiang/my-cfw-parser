module.exports.parse = async (
  raw,
  { axios, yaml, notify, console },
  { name, url, interval, selected }
) => {
  const obj = yaml.parse(raw)
  obj.proxies = obj.proxies.filter((v) => checkIsWanted(v.name))
  obj['proxy-groups'].forEach((group) => {
    group.proxies = group.proxies.filter((v) => checkIsWanted(v))

    if (group.name === 'PROXY') {
      group.type = 'url-test'
      group.url = 'http://www.gstatic.com/generate_204'
      group.interval = 600
    }
  })
  return yaml.stringify(obj)
}

function checkIsWanted(proxyName) {
  const regex = /(\d+)倍/
  if (proxyName.includes('①')) {
    const matchRes = proxyName.match(regex)
    return !matchRes || Number(matchRes[1]) <= 2
  } else if (
    !proxyName.includes('⓪') &&
    proxyName === proxyName.toUpperCase()
  ) {
    return true
  } else {
    return false
  }
}
