const entities = {
  path: 'src',
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
  entities,
  e: entities
})