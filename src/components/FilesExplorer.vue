<template>
  <div class="card">
    <MyDataTable :value="files" removableSort sortMode="multiple" selectionMode="single" @rowSelect="onRowSelect" responsiveLayout="scroll">

      <template #header>
        <div style="text-align: center">
          <MyButton @click="this.$emit('back')" label="..." class="p-button-outlined p-button-secondary p-button-sm" style="float: left; margin: 0 auto"/>
          {{ this.path }}
        </div>
      </template>
      <MyColumn headerStyle="width: 20px" bodyStyle="text-align: center; width: 1em">
        <template #body="slotProps">
          <i v-if="slotProps.data.directory" class="pi pi-folder"></i>
          <i v-else class="pi pi-file"></i>
        </template>
      </MyColumn>
      <MyColumn field="name" header="Name" :sortable="true"></MyColumn>
      <MyColumn field="size" header="Size" :sortable="true">
        <template #body="slotProps">
          {{slotProps.data.fsize}}
        </template>
      </MyColumn>
    </MyDataTable>
  </div>

</template>

<script>


export default {
  name: "FilesExplorer",
  emits: ['folderclick', 'back'],
  props: {
    files: {type: Array, default: () => []},
    path: [Number, String]
  },
  methods: {
    onRowSelect(event) {
      if (event.data.directory) this.$emit('folderclick',event.data)
    },
  }
}
</script>

<style scoped>

</style>