import SnapshotContext from 'snapshot-context'
import Context from '../context'
import runExtract from '../../src/bin/run/extract'
import { PassThrough } from 'stream'

/** @type {Object.<string, (c: Context, s: SnapshotContext )>} */
const T = {
  context: [
    Context,
    SnapshotContext,
  ],
  async 'extracts types from a file'({ catchment, SNAPSHOT_DIR, extractJsPath: source }, { setDir, test }) {
    setDir(SNAPSHOT_DIR)
    const stream = new PassThrough()
    const p = catchment(stream)
    await runExtract({
      stream,
      source,
    })
    const c = await p
    await test('extract.xml', c)
  },
}

export default T
