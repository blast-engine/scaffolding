const fs = require('fs')

const createFile = async ({ file, options, filePath, fileName }) => {
  const { template, name, shouldExport, indexer } = file
  const resolvedTemplate = await template(fileName)
  fs.appendFileSync(`${filePath}/${name(fileName)}`, resolvedTemplate)
  const finalIndex = indexer || 'index.js'

  if (shouldExport === false) {
    return
  }

  if (!fs.existsSync(`${filePath}/${finalIndex}`)) {
    fs.appendFileSync(`${filePath}/${finalIndex}`, `export * from './${name(fileName)}'`)
  }
  else {
    const indexJs = fs.readFileSync(`${filePath}/${finalIndex}`, { encoding: 'utf8' }).split('\n')
    if (!indexJs.find(i => i === `export * from './${name(fileName)}'`))
      fs.appendFileSync(`${filePath}/${finalIndex}`, `\nexport * from './${name(fileName)}'`)
  }
}

module.exports = { createFile }