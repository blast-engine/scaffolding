const fs = require('fs')
// const yargs = require('yargs')
// const path = require('path')
const { findFileRecursivelyUp } = require('@blast-engine/find-recursively-up')

const { CONFIG_FILE } = require('./constants')

const createDirectoryRecursively = async (path) => {
  const projectPath = (await findFileRecursivelyUp(CONFIG_FILE)).split('/')
  projectPath.pop()
  projectPath.concat(path).reduce((currFullPath, nextDirectory, index, array) => {
    if (index < projectPath.length) return `${currFullPath}/${nextDirectory}`
    if (!fs.existsSync(`${currFullPath}/${nextDirectory}`)) 
      fs.mkdirSync(`${currFullPath}/${nextDirectory}`)
    
    if (index !== array.length - 1) {
      if (!fs.existsSync(`${currFullPath}/${nextDirectory}/index.js`)) {
        fs.appendFileSync(`${currFullPath}/${nextDirectory}/index.js`, `export * from './${array[index+1]}'`)
      }
      else {
        const indexJs = fs.readFileSync(`${currFullPath}/${nextDirectory}/index.js`, { encoding: 'utf8' }).split('\n')
        if (!indexJs.find(i => i === `export * from './${array[index+1]}'`))
          fs.appendFileSync(`${currFullPath}/${nextDirectory}/index.js`, `\nexport * from './${array[index+1]}'`)
      }
    }

    return `${currFullPath}/${nextDirectory}`
  })
}

module.exports = { createDirectoryRecursively }

