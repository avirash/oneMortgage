const MAX_INT = 2147483647

module.exports = class LuminatiProxy {
  static acquire() {
    const random = Math.floor(Math.random() * MAX_INT) + 1
    return {
      host: 'zproxy.luminati.io',
      port: 22225,
      user: `lum-customer-aviram-zone-residential-country-uk-session-rand${random}`,
      pwd: `8acda4c2a9d1`
    }
  }
}
