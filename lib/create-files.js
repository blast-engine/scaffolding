const { getConfig } = require('./get-config.fn')
const { createFile } = require('./create-file')
const { createDirectoryRecursively } = require("./create-directory-recursively.fn")


const createFiles = async ({ type, name, path }) => {

  const config = await getConfig()

  if (!config[type]) throw new Error(`file type ${type} is not a valid type based on settings`) 

  if (!config[type]['files']) throw new Error(`Configuration for type ${type} is broken`)
  console.log('config for type: ', config[type])
  const typePath = config[type]['path']
  const filePathArray = Array.isArray(typePath) ? typePath.concat(path) : typePath.split('/').concat(path)
  if (Array.isArray(typePath)) {
    await createDirectoryRecursively(filePathArray)
  } else {
    await createDirectoryRecursively(filePathArray)
  }



  const allFilesPromise = config[type]['files'].map(async (file) => {
    const fileOptions = { ...config[type] }
    console.log('file name : ',name, ' file path: ', path, ' file type: ', type)
    return await createFile({ file, options: fileOptions, filePath: filePathArray.join('/'), fileName: name })
  })
  
  await Promise.all(allFilesPromise)
}

module.exports = { createFiles }