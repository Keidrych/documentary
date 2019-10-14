const { h } = require('preact');
const { spawn } = require('../../stdlib');
const { deepStrictEqual } = require('assert');
const { codeSurround } = require('../lib');
const { c } = require('../../stdlib');

/**
 * Executes a Java program. Caches the output.
 * @param {Object} opts
 * @param {import('../lib/Documentary').default} opts.documentary
 * @param {string[]} opts.children
 */
async function Java({ documentary, jar, nocache, children,
  stderr, lang = 'sh', notrim = false, console: co }) {
  const [a] = children
  const args = a.trim().split(/\s/)
  if (jar) args.unshift('-jar', jar)
  const name = args.join(' ')
  let stats, currentStats, data
  if (!nocache) {
    ({ stats, data } = documentary.getCache('java', undefined, name))
    currentStats = await args.reduce(async (acc, current) => {
      acc = await acc
      try {
        const t = await documentary.getLocaleChangeTime(current)
        acc.push({ [current]: t })
        return acc
      } catch (err) {
        return acc
      }
    }, [])
  }
  let d = data
  try {
    if (currentStats) deepStrictEqual(stats, currentStats)
  } catch (err) {
    const p = spawn('java', args)
    d = await p.promise
    if (d.code && !stderr && d.stderr) {
      documentary.log(c('java:', 'red'), c(stderr, 'grey'))
    }
    await documentary.addCache('java', { [name]: { stats: currentStats, data: d } })
  }
  let r = stderr ? d.stderr : d.stdout
  if (!notrim) r = r.trim()
  const cmd = codeSurround(r, lang)
  if (!co) return cmd

  const CMD = codeSurround(`${co}:~$ java ${name}`, 'console')
  return `${CMD}\n\n${cmd}`
}

module.exports = Java