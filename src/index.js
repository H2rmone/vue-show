import xShow from './x-show'
import easings from './easings'

const version = '1.0.4'

const install = function (Vue) {
  Vue.component(xShow.name, xShow)
}

module.exports = {
  version,
  install,
  easings,
}
