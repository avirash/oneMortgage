const _ = require('lodash')
const proxies = [
    { host: '109.230.203.55',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '134.255.243.249',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '109.230.220.213',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '134.255.243.27',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '134.255.243.239',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '185.121.138.129',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '109.230.220.159',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.245.160.74',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '89.35.31.98',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '185.193.39.70',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.245.160.99',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '134.255.243.245',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '185.193.39.93',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '134.255.243.89',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '134.255.243.89',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '89.35.31.163',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '109.230.220.21',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '165.231.45.2',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '185.121.138.213',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.196.253.22',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '109.230.203.198',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.196.253.108',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '88.150.182.206',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '185.182.49.10',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '191.101.116.139',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.196.252.99',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '165.231.45.95',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '165.231.45.249',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '196.196.253.246',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '165.231.45.95',
      port: 80,
      user:'feat',
      pwd:'Aqswdefr!'
    },
    { host: '109.230.220.141',
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
