import { debuglog } from 'util'
import { parse } from 'path'
import { read, codeSurround } from '..'

const LOG = debuglog('doc')

const getExt = (type, source) => {
  return type || parse(source).ext.replace(/^\./, '')
}

const getPartial = (boundExample) => {
  const s = boundExample
    .replace(/^\s*\n/gm, '')
    .replace(/[^\s]/g, '')
  const minLength = s
    .split('\n')
    .reduce((acc, current) => {
      if (current.length < acc) return current.length
      return acc
    }, Infinity)
  const e = boundExample
    .replace(new RegExp(`^ {${minLength}}`, 'gm'), '')
  return e
}

export const replacer = async (match, source, from, to, type) => {
  try {
    let f = await read(source)
    f = f.trim()
    if (from && to) {
      f = f
        .replace(/^(import .+? )(from (['"])(.+)\3)/gm, (m, i, fromSeg, q, fr) => {
          if (fr == from) {
            const r = fromSeg.replace(fr, to)
            return `${i}${r}`
          }
          return m
        })
        .replace(/=\s+require\((['"'])(.+?)\1\)/gm, (m, q, fr) => {
          if (fr == from) return m.replace(fr, to)
          return m
        })
    }

    let ff = f
    const fre = /\/\* start example \*\/([\s\S]+?)\/\* end example \*\//.exec(f)
    if (fre) {
      const [, boundExample] = fre
      ff = getPartial(boundExample)
      LOG('Example (partial): %s', source)
    } else {
      LOG('Example: %s', source)
    }

    const lang = getExt(type, source)
    const res = codeSurround(ff.trim(), lang)
    return res
  } catch (err) {
    LOG(err)
    return match
  }
}
export const re = /^%EXAMPLE: (.[^\n,]+)(?:, (.+?) => (.[^\s,]+))?(?:, (.+))?%$/gm

const exampleRule = {
  re,
  replacement: replacer,
}

export default exampleRule
