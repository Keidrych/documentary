import whichStream from 'which-stream'
import { getToc } from '../lib/Toc'
import Documentary from '../lib/Documentary'
import { getStream } from '../lib'
import { getTypedefs } from '../lib/Typedefs'

/**
 * Run the documentary and save the results.
 * @param {RunOptions} options Options for the run command.
 * @param {string} options.source The path to the source directory or file.
 * @param {string} [options.output="-"] The path where to save the output. When `-` is passed, prints to `stdout`. Default `-`.
 * @param {boolean} [options.reverse=false] Read files in directories in reverse order, such that `30.md` comes before `1.md`. Useful for blogs. Default `false`.
 * @param {boolean} [options.justToc=false] Only print the table of contents and exit. Default `false`.
 * @param {boolean} [options.h1=false] Include `H1` headers in the table of contents. Default `false`.
 */
export default async function run(options) {
  const {
    source, output = '-', reverse, justToc, h1,
  } = options
  const stream = getStream(source, reverse)
  // todo: figure out why can't create a pass-through, pipe into it and pause it

  const { types, locations } = await getTypedefs(stream)

  const stream2 = getStream(source, reverse)
  const toc = await getToc(stream2, h1, locations)
  if (justToc) {
    console.log(toc)
    process.exit()
  }

  const stream3 = getStream(source, reverse)
  const doc = new Documentary({ toc, locations, types })
  stream3.pipe(doc)
  await whichStream({
    readable: doc,
    destination: output,
  })
  if (output != '-') {
    console.log('Saved documentation to %s', output)
  }
}

/* documentary types/run.xml */
/**
 * @typedef {Object} RunOptions Options for the run command.
 * @prop {string} source The path to the source directory or file.
 * @prop {string} [output="-"] The path where to save the output. When `-` is passed, prints to `stdout`. Default `-`.
 * @prop {boolean} [reverse=false] Read files in directories in reverse order, such that `30.md` comes before `1.md`. Useful for blogs. Default `false`.
 * @prop {boolean} [justToc=false] Only print the table of contents and exit. Default `false`.
 * @prop {boolean} [h1=false] Include `H1` headers in the table of contents. Default `false`.
 */
