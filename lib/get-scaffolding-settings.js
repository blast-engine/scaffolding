const path = require('path')

const { findFileRecursivelyUp } = require('@blast-engine/find-recursively-up')

const { CONFIG_FILE } = require('./constants')
const getConfig = async () => {

  const configPath = await findFileRecursivelyUp(CONFIG_FILE)
  if (!configPath) throw new Error(`${CONFIG_FILE} not found`)

  let config
  try { 
    config = require(configPath) 
    
  } catch (e) { throw new Error(`${CONFIG_FILE} is broken`) }

  return {
    ...config,
    _dir: path.parse(configPath).dir
  }
  // _dir: 'C:\\Users\\armin.ghobadi\\code\\scaffolding'

}

// getConfig().then(console.log)

module.exports = { getConfig }