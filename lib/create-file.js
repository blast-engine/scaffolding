const fs = require('fs')

const createFile = async ({ file, options, filePath, fileName }) => {
  const { template, name, shouldExport } = file
  const resolvedTemplate = await template(fileName)
  fs.appendFileSync(`${filePath}/${name(fileName)}`, resolvedTemplate)

  if (shouldExport === false) {
    return
  }

  if (!fs.existsSync(`${filePath}/index.js`)) {
    fs.appendFileSync(`${filePath}/index.js`, `export * from './${name(fileName)}'`)
  }
  else {
    const indexJs = fs.readFileSync(`${filePath}/index.js`, { encoding: 'utf8' }).split('\n')
    if (!indexJs.find(i => i === `export * from './${name(fileName)}'`))
      fs.appendFileSync(`${filePath}/index.js`, `\nexport * from './${name(fileName)}'`)
  }
  
}

module.exports = { createFile }