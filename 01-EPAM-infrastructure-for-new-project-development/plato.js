var plato = require('plato')

var files = ['./utils/utils.js', './index.js']

var outputDir = './report/'
var options = {
  title: 'My report'
}

var callback = function () {
  console.log('report ready!')
}

plato.inspect(files, outputDir, options, callback)
