const request = require('request')
const Metrics = require('../../lib/metrics')

Q.Errors.declare('FailedToAcquireProxyError', 'Unable to acquire proxy', {
  retryAfter: Q.config.get('proxies.failureRetryAfterSeconds', 60)
})

const DEFAULT_HOST = 'https://localhost:3015'

module.exports = class Proxy {
  constructor(config) {
    this.config = config
  }

  async acquire(site) {
    // Acquire proxy from proxy pool
    let host = this.config.get('proxies.proxy_pool.host', DEFAULT_HOST)
    let start = Date.now()
    try {
      var response = await request.getAsync({
        url: `${host}/get_proxy/${site}`,
        forever: true,
        json: true
      })
    } catch (err) {
      Q.log.error({ err, site }, 'Unable to acquire proxy')
      throw new Q.Errors.FailedToAcquireProxyError({ site }, err)
    } finally {
      Metrics.proxyAcquireTime(Date.now() - start)
    }

    let body = response.body
    if (response.statusCode !== 200 || !body || !body.proxy) {
      throw new Q.Errors.FailedToAcquireProxyError(site, null, response.statusCode, response.body)
    }

    const { key, proxy: { USER, PASS, HOST, PORT, id } } = body
    return { key, id, user: USER, pwd: PASS, host: HOST, port: PORT }
  }

  _getDetention(statusCode) {
    switch(statusCode){
        case 503: return 30;
        case 200: return 10;
        default: return 180;
    }
  }

  async release(site, proxy, status) {
    let detention = this._getDetention(status)
    let host = this.config.get('proxies.proxy_pool.host', DEFAULT_HOST)
    let start = Date.now()
    if (!proxy.id) return
    try {
      var response = await request.postAsync({
        url: `${host}/detain_proxy/${site}/${proxy.id}`,
        forever: true,
        json: true,
        body: {
          detention,
          status
        }
      })
    } catch (err) {
      Q.log.error(new Q.Errors.FailedToReleaseProxyError('An error occured during release proxy', err))
    } finally {
      Metrics.proxyReleaseTime(Date.now() - start)
    }
    if (response && response.statusCode !== 200) {
      Q.log.error(
        new Q.Errors.FailedToReleaseProxyError({ statusCode: response.statusCode }),
        `failed to release proxy -> statusCode: ${response.statusCode}`
      )
    }
  }
}
