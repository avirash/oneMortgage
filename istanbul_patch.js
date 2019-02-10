module.exports = function stripIstanbulCoverageCounters(func) {
  // Is there any other way to know if we run inside istanbul?
  // I guess yes :)
  if (!process.env['STRIP_COVERAGE']) return func

  // Istanbul inserts statements like:
  //    cov_2nwks4qcjn.s[5]++;
  //    cov_2nwks4qcjn.b[0][1]++;
  // We remove it as __cov_ variable won't exist in browser context
  let funcString = func.toString().replace(/cov_[\d\w]+\.\w+(\[\d+\])+\+\+[;,]/g, '')

  /* eslint no-eval: 0 */
  return eval(`(function() {
    return ${funcString}
  })()`)
}
