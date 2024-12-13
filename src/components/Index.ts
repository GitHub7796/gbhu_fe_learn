import SvgIcon from './SvgIcon/Index.vue'
import { App, Component } from 'vue'
const components: { [name: string]: Component } = { SvgIcon }
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}
