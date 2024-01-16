const { getConfig } = require('./get-config.fn')
const { createFile } = require('./create-file')
const { createDirectoryRecursively } = require("./create-directory-recursively.fn")

const createFiles = async ({ type, name, path }) => {

  const config = await getConfig()
  const typeConfig = config[type]

  if (!typeConfig) throw new Error(`file type ${type} is not a valid type based on settings`) 
  if (!typeConfig.files) throw new Error(`Configuration for type ${type} is missing`)

  const typePath = typeConfig.path
  const indexer = typeConfig.indexer // TODO
  const filePathArray = Array.isArray(typePath) ? typePath.concat(path) : typePath.split('/').concat(path)
  
  await createDirectoryRecursively(filePathArray, typePath)
  
  const allFilesPromise = typeConfig.files.map(async (file) => {
    const fileOptions = { ...typeConfig }
    return await createFile({ file, options: fileOptions, filePath: filePathArray.join('/'), fileName: name })
  })
  
  await Promise.all(allFilesPromise)
}

module.exports = { createFiles }