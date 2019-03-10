const _ = require('lodash')
const proxies = [
                  { host: '134.255.243.24',
                    port: 80,
                    user:'feat',
                    pwd:'Aqswdefr!'
                  },
                  { host: '109.230.203.32',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  },
                  { host: '185.121.138.177',
                    port: 80,
                    user: 'feat',
                    pwd: ':Aqswdefr!'
                  },
                  { host: '191.101.116.153',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  },
                  { host: '185.121.138.96',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  },
                  { host: '134.255.243.189',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  },
                  { host: '165.231.45.107',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  },
                  { host: '191.101.116.136',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  },
                  { host: '109.230.203.82',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  },
                  { host: '165.231.45.167',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  }
]

module.exports = class Proxy {
  static acquire() {
    var randomProxy = _.sample(proxies)
    return randomProxy
  }
}
