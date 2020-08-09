

module.exports = (name) => {
  let ClassName = name.split('')
  ClassName[0] = ClassName[0].toUpperCase()
  return `import React from 'react'
export const ${ClassName.join('')} = class ${ClassName.join('')} extends React.Component {
  render() {
    return null
  }
}`

}
