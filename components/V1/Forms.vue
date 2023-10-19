<script lang="ts" setup>
const { data, pending, error, refresh } = await useAsyncData('form-collection',()=> $fetch('http://127.0.0.1:8000/api/v1/form'), {
  transform: (d) => {
    return d.data
  }
})
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <div v-if="data" class="grid gap-4">
      <form v-for="form in data" class="p-2 grid">
      <div v-for="row in form.rows">
        row: {{ row.order }}
          <div v-for="col in row.columns">
            col: {{ col.order }}
            <div v-for="field in col.fields" class="grid">
                field: {{ field.order }}
            </div>
          </div>
      </div>
    </form>
    </div>
  </div>
</template>


<style>

</style>

