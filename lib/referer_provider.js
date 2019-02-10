const _ = require('lodash')

class RefererProvider {
  static getReferer() {
    return _.sample([
      'https://www.google.com',
      'https://www.facebook.com',
      'https://www.twitter.com',
      'https://www.pinterest.com',
      'https://www.duckduckgo.com',
      'https://www.bing.com',
      'https://www.yahoo.com',
      'https://www.techcrunch.com',
      'https://www.wired.com',
      'http://www.cnn.com',
      'http://www.foxnews.com',
      'https://www.instagram.com/',
      'https://www.flickr.com',
      'http://www.bbc.com/'
    ])
  }
}

module.exports = RefererProvider
