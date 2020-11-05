#!/usr/bin/env node
const yargs = require('yargs')
const { red, blue } = require('chalk')

const { createFiles } = require('../lib')

// usage: yarn sc [type] [path?] [path?] [path?] [name]
// or: yarn sc [type] [path?/path?/path?/name]
;(async () => {
  
  const [ fileType, ...filePathAndName ] = yargs.argv._ 
  
  if (!fileType) return console.log(red('file type cannot be empty'))
  if (!filePathAndName.length) return console.log(red('file name cannot be empty'))
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

  return console.log(blue('files successfully created!'))
})()
