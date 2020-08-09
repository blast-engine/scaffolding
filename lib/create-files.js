const { getConfig } = require('./get-config.fn')
const { createFile } = require('./create-file')
const { createDirectoryRecursively } = require("./create-directory-recursively.fn")


const createFiles = async ({ type, name, path }) => {

  const config = await getConfig()

  if (!config[type]) throw new Error(`file type ${type} is not a valid type based on settings`) 

  if (!config[type]['files']) throw new Error(`Configuration for type ${type} is broken`)
  const typePath = config[type]['path']
  const filePathArray = Array.isArray(typePath) ? typePath.concat(path) : typePath.split('/').concat(path)
  
  await createDirectoryRecursively(filePathArray, typePath)
  
  const allFilesPromise = config[type]['files'].map(async (file) => {
    const fileOptions = { ...config[type] }
    return await createFile({ file, options: fileOptions, filePath: filePathArray.join('/'), fileName: name })
  })
  
  await Promise.all(allFilesPromise)
}

module.exports = { createFiles }