import Vue, { PluginFunction } from "vue"

interface DefaultObject {
  [key: string]: any
}

declare module 'vue/types/vue' {
  interface Vue {
    $utils: any
    install: PluginFunction<any>
    $loadingStack: Function
  }
}