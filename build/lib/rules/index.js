const createTocRule = (toc) => {
  return {
    re: /^%TOC%$/gm,
    replacement: toc,
  }
}

const commentRe = /<!--[\s\S]*?-->\n*/g

const codeRe = /^( *)```(`)?(?!table$)(\w+)?\n[\s\S]*?\n\1```\2/gm

const innerCodeRe = /`[^`\n]+?`/gm

const commentRule = {
  re: commentRe,
  replacement() {
    this.log && this.log('stripping comment')
    return ''
  },
}

// ^[\n because can be part of a table row
const linkTitleRe = /\[([^[\n]+?)\]\((t|#+)(?:-([\w\d]+))?\)/gm
const linkRe = /\[([^\n\]]+?)\]\(l(?:-([\w\d]+))?\)/gm

module.exports.createTocRule = createTocRule
module.exports.commentRe = commentRe
module.exports.codeRe = codeRe
module.exports.innerCodeRe = innerCodeRe
module.exports.commentRule = commentRule
module.exports.linkTitleRe = linkTitleRe
module.exports.linkRe = linkRe