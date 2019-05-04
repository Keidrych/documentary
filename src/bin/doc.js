#!/usr/bin/env node
import { _source, _output, _toc, _watch, _push, _version, _extract, _h1, _reverse, _generate, _noCache, _namespace, _help, argsConfig } from './get-args'
import { watch } from 'fs'
import { debuglog } from 'util'
import { lstatSync } from 'fs'
import alamode from 'alamode'
import { dirname } from 'path'
import usually from 'usually'
import { reduceUsage } from 'argufy'
import doc from './run/doc'
import catcher from './catcher'
import { gitPush } from '../lib'

const LOG = debuglog('doc')
const DEBUG = /doc/.test(process.env['NODE_DEBUG'])

if (_version) {
  console.log(require('../../package.json').version)
  process.exit(0)
} else if (_help) {
  const u = usually({
    description: 'Documentation generator https://artdecocode.com/documentary',
    usage: reduceUsage(argsConfig),
    line: 'doc source [-o output] [-trwcn] [-p "commit message"] [-h1] [-eg] [-vh]',
    example: 'doc documentary -o README.md',
  })
  console.log(u)
  process.exit(1)
}

const preact = dirname(require.resolve('preact/package.json'))
alamode({
  pragma: 'const { h } = r'+`equire("${preact}");`,
})

if (_source) {
  try {
    lstatSync(_source)
  } catch (err) {
    if (err.message) err.message = `Could not read input ${_source}: ${err.message}`
    catcher(err)
  }
}

(async () => {
  if (_extract) {
    console.log('Typal: smart typedefs https://artdecocode.com/typal/')
    console.log('Please use typal (included w/ Documentary):')
    console.log('\ntypal %s -m', _source)
    return
  }
  if (_generate) {
    console.log('Typal: smart typedefs https://artdecocode.com/typal/')
    console.log('Please use typal (included w/ Documentary):')
    console.log('\ntypal %s [--closure]', _source)
    return
  }
  const docOptions = {
    source: _source, output: _output, justToc: _toc, h1: _h1,
    reverse: _reverse, noCache: _noCache, rootNamespace: _namespace,
  }
  let files
  try {
    files = await doc(docOptions)
  } catch ({ stack, message, code }) {
    DEBUG ? LOG(stack) : console.log(message)
  }

  let debounce = false
  if (_watch || _push) {
    // todo: also watch referenced example files.
    watch(_source, { recursive: true }, async () => {
      if (!debounce) {
        debounce = true
        files = await doc(docOptions)
        if (_push) {
          console.log('Pushing documentation changes.')
          await gitPush(_source, _output, _push, files)
        }
        debounce = false
      }
    })
  }
})()