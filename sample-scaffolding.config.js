const entities = {
  path: 'src',
  indexer: 'index.ts',
  files: [{
      template: require('./template'),
      name: name => `${name}.js`,
    }, {
      template: require('./template'),
      name: name => `${name}.css`,
      shouldExport: false
    }
  ], 
}

module.exports = async () => ({
  entities
})

const hooks = (name, options) => {
  
}