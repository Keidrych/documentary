import { equal } from '@zoroaster/assert'
import mismatch from 'mismatch'
import { getLink } from '../../src/lib'
import { makeComponentRe } from '../../src/lib/components'

/** @type {Object.<string, (c: Context)>} */
export const GetLink = {
  async 'strips the br tags and &nbsp;'() {
    const link = getLink('`koa2Jsx({`<br/>&nbsp;&nbsp;`reducer: function,`<br/>&nbsp;&nbsp;`View: Container,`<br/>&nbsp;&nbsp;`actions: object,`<br/>&nbsp;&nbsp;`static?: boolean = true,`<br/>&nbsp;&nbsp;`render?: function,`<br/>`}): function`')
    const message = 'koa2jsxreducer-functionview-containeractions-objectstatic-boolean--truerender-function-function'
    equal(link, message)
  },
  async 'keeps special characters'() {
    const link = getLink('ÀLaNode')
    equal(link, 'àlanode')
  },
}
