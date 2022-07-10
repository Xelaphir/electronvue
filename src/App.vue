<template>
  <span class="p-input-icon-left">
      <i class="pi pi-search"/>
      <MyInputText type="text" v-model="searchString" placeholder="Search" style="float: left"/>
  </span>
  <FilesExplorer
      :files="filteredFiles"
      :path="path"
      @back="back"
      @folderclick="open($event.name)"
  />
</template>

<script>
import fs from 'fs'
import pathModule from 'path'
import {app} from '@electron/remote'
import {computed, ref} from 'vue'
import FilesExplorer from "@/components/FilesExplorer";


const formatSize = size => {
  let i = Math.floor(Math.log(size) / Math.log(1024))
  return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 +
      ' ' +
      ['B', 'kB', 'MB', 'GB', 'TB'][i]
  )
}

export default {
  components: {FilesExplorer},


  setup() {
    const path = ref(app.getAppPath())
    const files = computed(() => {
      const filenames = fs.readdirSync(path.value)
      return filenames
          .map(file => {
            const stats = fs.statSync(pathModule.join(path.value, file))
            return {
              name: file,
              size: stats.isFile() ? stats.size : null,
              fsize: stats.isFile() ? formatSize(stats.size ?? 0) : null,
              directory: stats.isDirectory()
            }
          })
          .sort((a, b) => {
            if (a.directory === b.directory) {
              return a.name.localeCompare(b.name)
            }
            return a.directory ? -1 : 1
          })
    })

    const back = () => {
      path.value = pathModule.dirname(path.value)
    }
    const open = folder => {
      path.value = pathModule.join(path.value, folder)
    }

    const searchString = ref('')
    const filteredFiles = computed(() => {
      return searchString.value
          ? files.value.filter(s => s.name.startsWith(searchString.value))
          : files.value
    })
    return {
      path,
      open,
      back,
      files,
      searchString,
      filteredFiles
    }

  }
}

</script>
<style>

</style>
