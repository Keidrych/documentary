import { createReadStream, lstatSync } from 'fs'
import spawn from 'spawncommand'
import Catchment from 'catchment'
import Pedantry from 'pedantry'
import tableRule from './rules/table'
import titleRule from './rules/method-title'

export const getLink = (title) => {
  const l = title
    .replace(/<\/?code>/g, '')
    .replace(/<\/?strong>/g, '')
    .replace(/<br\/>/g, '')
    .replace(/&nbsp;/g, '')
    .replace(/[^\w-\d ]/g, '')
    .toLowerCase()
    .replace(/[, ]/g, '-')
  return l
}

export const makeARegexFromRule = (rule) => {
  const re = new RegExp(`^${rule.re.source}`)
  return re
}

export const exactTable = makeARegexFromRule(tableRule)
export const exactMethodTitle = makeARegexFromRule(titleRule)

export const read = async (source) => {
  const rs = createReadStream(source)
  const data = await new Promise(async (r, j) => {
    const { promise } = new Catchment({ rs })
    rs.on('error', j)
    const res = await promise
    r(res)
  })
  return data
}

export const getStream = (path) => {
  const ls = lstatSync(path)
  let stream
  if (ls.isDirectory()) {
    stream = new Pedantry(path)
  } else if (ls.isFile()) {
    stream = createReadStream(path)
  }
  return stream
}

export const gitPush = async (source, output, message) => {
  const { promise } = spawn('git', ['log', '--format=%B', '-n', '1'])
  const { stdout } = await promise
  const s = stdout.trim()
  if (s == message) {
    await git('reset', 'HEAD~1')
  }
  await git('add', source, output)
  await git('commit', '-m', message)
  await git('push', '-f')
}

export const git = async (...args) => {
  const { promise } = spawn('git', args, { stdio: 'inherit' })
  await promise
}
