// This module provides the `isBlacklisted` function that accepts a url
// and returns true if the request should be blocked

const istanbulPatch = require('../istanbul_patch')

const BLACKLIST = [
  'advertising.com',
  'adservice.google.',
  'g.doubleclick.net',
  'beacon.walmart.com/rum.gif?ads=',
  'rhpury.105app.com',
  'pixel.mathtag.com',
  'media.richrelevance.com',
  'masterpass.com',
  'hudsonbaycompany.tt.omtrdc.net',
  'vms.boldchat.com',
  'content.shoprunner.com',
  's.thebrighttag.com',
  'www.google-analytics.com',
  'embassy.fiftyone.com',
  'bam.nr-data.net',
  'js-agent.newrelic.com',
  'pinterest.com',
  'bkrtx.com',
  'analytix.yahoo.com',
  'sb.scorecardresearch.com',
  'googlesyndication.com',
  'facebook.net',
  'atdmt.com',
  'res-x.com',
  'match.adsrvr.org',
  'ads.yahoo.com',
  'adadvisor.net',
  'centro.pixel.ad',
  'bat.r.msn.com',
  'conductor.clicktale.net',
  'pixel.sitescout.com'
]

function isBlacklisted(url) {
  var blacklist = ['PLACEHOLDER']
  for (var i = 0; i < blacklist.length; i++) {
    if (url.indexOf(blacklist[i]) !== -1) return true
  }
  return false
}

module.exports = istanbulPatch(isBlacklisted).toString()
  .replace("'PLACEHOLDER'", BLACKLIST.map(_ => `'${_}'`).join(', '))
