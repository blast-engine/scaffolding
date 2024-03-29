#!/usr/bin/env node
const yargs = require('yargs')
const { red, blue } = require('chalk')

const { createFiles, getConfig } = require('../lib')

// usage: yarn sc-new [type] [path?] [path?] [path?] [name]
// or: yarn sc-new [type] [path?/path?/path?/name]
;(async () => {
  
  const [fileType, ...filePathAndName] = yargs.argv._ 
  const config = await getConfig();
  const providedTemplates = Object.keys(config).filter(i => i !== '_dir')
  
  if (!fileType) {
    console.log(red('File type cannot be empty. Usage: yarn sc-new [type] path/to/file/fileName.'))
    return console.log(red(`Available types: \n${providedTemplates.map(i => `- ${i}`).join('\n')}`))
  }
  if (!filePathAndName.length) return console.log(red('File name cannot be empty'))
  let filePathArray = []
  let fileName

  // if one item provided for the file path and file name
  if (filePathAndName.length === 1) {
    // if the item provided has a slash seperated path
    const filePathAndNameArray = filePathAndName[0].split('/')
    if (filePathAndNameArray.length > 1) {
      fileName = filePathAndNameArray.pop()
      filePathArray = filePathAndNameArray
    }
    else {
      fileName = filePathAndNameArray[0]
    }
  }
  else {
    fileName = filePathAndName.pop()
    filePathArray = filePathAndName
  }

  if (filePathArray.length === 1) {
    filePathArray = filePathArray[0].split('/')
  }

  try {
    await createFiles({ type: fileType, name: fileName, path: filePathArray })
  } catch (e) { return console.log(red(e)) }

  return console.log(blue('Files successfully created!'))
})()
