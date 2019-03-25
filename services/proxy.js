const _ = require('lodash')
const proxies = [
    { host: '196.196.255.59',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.245.163.217',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.196.31.85',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.196.31.176',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '109.230.203.216',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '109.230.220.161',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.196.255.62',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '165.231.45.142',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '165.231.45.83',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.196.31.60',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.245.160.175',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '109.230.203.99',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '109.230.203.52',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '165.231.45.130',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '109.230.220.17',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '185.182.49.141',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.196.31.254',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '185.182.49.75',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.196.255.83',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.245.163.215',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.196.255.84',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '109.230.220.41',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '89.37.66.33',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.245.160.46',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '185.182.49.58',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '109.230.220.127',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '89.37.66.8',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '109.230.203.95',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '185.182.49.167',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '165.231.45.68',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    }
]

module.exports = class Proxy {
  static acquire() {
    var randomProxy = _.sample(proxies)
    return randomProxy
  }
}
