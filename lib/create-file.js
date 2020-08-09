const fs = require('fs')
const { red, blue, yellow, green } = require('chalk')

/**
 * 
 * fileOptions: {
 *    template,
 *    extension,
 *    shouldHaveOptionNameInFileName,
 *    shouldCapitalizeNameInTemplate,
 *    shouldAddToIndexJS
 * }
 */
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
  
  // const { template, shouldHaveOptionNameInFileName, shouldAddToIndexJS, extension } = file
  // const { shouldOverrideFileIfExists } = options
  // // first, check if directory exists
  
  // // template is a function
  // template.length



  // check if the passed path is a valid path¬
  // if (!fs.existsSync(path)) {
  //   console.log(red(`Path ${path} doesn't exist`))
  //   return
  // }
  // const { template, extension, shouldHaveOptionNameInFileName, shouldCapitilizeNameInTemplate, shouldAddToIndexJS } = fileOptions

  // const slashedPath = path[path.length-1] === '/' ? path : path + '/'
  // const data = template(fileName)

  // fs.writeFileSync(`${slashedPath}${fileName}.${extension}`, data)
  // if (shouldAddToIndexJS) {
  //   fs.appendFileSync(`${slashedPath}index.js`, `export * from './${fileName}'\n`)
  // }
  
}

module.exports = { createFile }
// const slashedPath = info.path[info.path.length-1] === '/' ? info.path : info.path + '/'
// info.files.forEach(file => {
//   let fileName
//   const fileExtensionWithDot = file.extension[0] === '.' ? file.extension : '.' + file.extension
  

//   if (fs.existsSync(`${slashedPath}${fileName}`) && !shouldOverride) {
//     console.log(red(`File exists at path: ${slashedPath}${fileName}`))
//     return
//   }
//   const filePath = `${slashedPath}${fileName}`

//   try {
//     fs.writeFileSync(filePath, file.template(name))
//   } catch(e) {
//     if (e.errno === -2) {
//       console.log(red('Directory does not exist. Please create the directory yourself!'))
//       return
//     }
//     console.error(e)
//     return
//   }

// })