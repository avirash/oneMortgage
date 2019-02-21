const _ = require('lodash')
const proxies = [
                  { host: '162.212.173.210',
                    port: 80,
                    user:'feat',
                    pwd:'Aqswdefr!'
                  },
                  { host: '176.61.140.96',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  },
                  { host: '104.160.14.165',
                    port: 80,
                    user: 'feat',
                    pwd: ':Aqswdefr!'
                  },
                  { host: '165.231.85.27',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  },
                  { host: '165.231.85.178',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  },
                  { host: '171.22.254.154',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  },
                  { host: '176.61.140.74',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  },
                  { host: '171.22.254.110',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  },
                  { host: '104.160.14.82',
                    port: 80,
                    user: 'feat',
                    pwd: 'Aqswdefr!'
                  },
                  { host: '171.22.254.2',
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
