const { fork } = require('../../../stdlib');
const { c } = require('../../../stdlib');
const { resolve, join } = require('path');
const { resolveDependency } = require('../../../stdlib');
const { clearr } = require('../../../stdlib');
const { compare } = require('../../../stdlib');
const { clone } = require('../../../stdlib');
const { forkfeed } = require('../../../stdlib');
const { codeSurround } = require('../');
const { Catchment } = require('../../../stdlib');

const queue = {}

const replacement = async function (noCache, old, err, lang, m, awaited = false, answers, {
  parsedEnv, env } = {}) {
  if (awaited) noCache = false
  const [mod, ...args] = m.split(' ')

  const { path: mmod } = await resolveDependency(mod)
  const s = `FORK${err || ''}${lang ? `-${lang}` : ''}: ${c(mmod, 'yellow')} ${
    args.map(a => c(a, 'grey')).join(' ')}`.trim()

  let printed = false

  const modules = this.getCache('modules')

  if (noCache) delete modules[mmod]
  const { hash, mtime, reason, result, currentMtime, md5 } =
    await compare(mmod, modules, (...a) => {
      if (!printed) this.log(s)
      printed = true
      console.log(...a)
    })

  const { wiki } = this._args
  let addModulesCacheLater
  if (noCache || !result) {
    printed = true
    if (noCache) { // saving cache for next time
      this.log(s, ':: no cache')
    } else if (reason == 'NO_CACHE') {
      this.log(`${s} module has no cache`)
    } else if (reason == 'MTIME_CHANGE') {
      this.log(`${s} changed since %s`, currentMtime)
    }
    const cacheToWrite = { [mmod]: {
      'mtime': mtime, 'hash': hash, 'md5': md5,
    } }
    // post-pone setting the module cache until the fork results are got
    // it case of cancelling the process with SIGINT
    addModulesCacheLater = () => this.addCache('modules', cacheToWrite)
  } else {
    const cache = this.getCache('fork')
    const record = cache[`[${md5}] ${env ? `${env} ` : ''}${m}`]
    if (record) {
      this.log('%s %s', s, awaited ? 'awaited' : 'cached')
      const { 'stderr': stderr, 'stdout': stdout } = record
      this.addAsset(mmod)
      return await getOutput(err, stderr, stdout, lang, wiki)
    } else {
      printed = true
      this.log('%s arguments not cached', s)
    }
  }

  !printed && this.log(s)

  const { stdout, stderr } = await doFork(old, mod, args, answers, parsedEnv)

  const cacheToWrite = { [`[${md5}] ${m}${env ? `${env} ` : ''}`]: {
    'stdout': stdout, 'stderr': stderr,
  } }
  await Promise.all([
    this.addCache('fork', cacheToWrite),
    addModulesCacheLater ? addModulesCacheLater() : null,
  ])

  this.addAsset(mmod)
  return await getOutput(err, stderr, stdout, lang, wiki)
}

/**
 * Answers are allowed in <fork> component.
 */
const doFork = async (old, mod, args, answers = {}, env = {}) => {
  const documentaryFork = resolve(__dirname, '../../fork')
  const cp = fork(old ? mod : documentaryFork, args, {
    execArgv: [],
    stdio: 'pipe',
    ...(old ? {} : {
      env: {
        DOCUMENTARY_REQUIRE: resolve(mod),
        INDICATRIX_PLACEHOLDER: '1',
        ...process.env,
        ...env,
      },
    }),
  })
  let stdout, stderr, stdoutLog, stderrLog
  if (answers.stdout) {
    stdoutLog = new Catchment()
    forkfeed(cp.stdout, cp.stdin, answers.stdout, stdoutLog)
    // stdoutLog.pipe(process.stdout)
  }
  if (answers.stderr) {
    stderrLog = new Catchment()
    forkfeed(cp.stderr, cp.stdin, answers.stderr, stderrLog)
    // stderrLog.pipe(process.stderr)
  }
  const res = await cp.promise
  if (stdoutLog) stdoutLog.end()
  if (stderrLog) stderrLog.end()
  if (stdoutLog) stdout = await stdoutLog.promise
  else ({ stdout } = res)
  if (stderrLog) stderr = await stderrLog.promise
  else ({ stderr } = res)

  return { stdout, stderr }
}

const forkRule = {
  re: /( *)%([/!_]+)?FORK(ERR)?(?:-(\w+))? (.+)%/mg,
  async replacement(match, ws, service, err, lang, m, /* <fork api> */ answers, { parsedEnv, env } = {}) {
    const noCache = /!/.test(service) || this.noCache
    const old = /_/.test(service)
    const relative = /\//.test(service)
    try {
      let awaited = false
      const mm = `${env ? `${env} ` : ''} ${m}`
      const q = queue[mm]
      if (q) {
        this.log(`FORK: ${mm} `, c(`awaiting ${q.err ? 'stderr' : 'stdout'}`, 'yellow'))
        await q.promise
        awaited = true
      }
      const promise = replacement.call(this, noCache, old, err, lang, m, awaited, answers, { parsedEnv, env })
      queue[mm] = { promise, err }
      let res = await promise
      delete queue[mm]
      if (ws) res = res.replace(/^/gm, ws)
      if (relative) res = res.replace(new RegExp(`${process.cwd()}/?`, 'g'), '')
      return res
    } catch (e) {
      this.log(c(`FORK ${m} error`, 'red'))
      this.log(e)
      return match
    }
  },
}

let indicatrixId = 0

const getOutput = async (err, stderr, stdout, lang, wiki) => {
  const res = err ? stderr : stdout
  const r = res.trim().replace(/\033\[.*?m/g, '')
  const cleared = clearr(r)

  if (/<INDICATRIX_PLACEHOLDER>/.test(cleared)) {
    let indicatrix = '.documentary/indicatrix.gif'
    if (wiki) indicatrix = join(wiki, indicatrix)
    const imgPath = join(__dirname, '../../indicatrix.gif')
    await clone(imgPath, '.documentary')
    const t = cleared.replace(/<INDICATRIX_PLACEHOLDER>/g,
      `<a id="_ind${indicatrixId}" href="#_ind${indicatrixId}"><img src="${indicatrix}"></a>\n`)
    indicatrixId ++
    return `<pre>${t}</pre>`
  }

  return codeSurround(cleared, lang)
}

module.exports=forkRule