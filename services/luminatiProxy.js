const MAX_INT = 2147483647

module.exports = class LuminatiProxy {
  static acquire() {
    const random = Math.floor(Math.random() * MAX_INT) + 1
    const country = '-country-UK'
    const session = 'session'
    const usernamePrefix = process.env.lusernamePrefix
    return {
      host: 'zproxy.luminati.io',
      port: 22225,
      user: `${usernamePrefix}${country}-${session}-rand${random}`,
      pwd: process.env.lPwd
    }
  }
}
