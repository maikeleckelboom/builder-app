<script lang="ts" setup>
const {data, pending, error, refresh} = await useAsyncData(() => $fetch(`http://127.0.0.1:8000/api/v1/form/${1}`), {
  transform: (d: any) => {
    return d.data
  }
})
</script>

<template>
  <form>
    <div v-for="row in data.rows">
      {{ row.type }} {{ row.order }}
      <div v-for="col in row.columns">
        {{ col.type }} {{ col.order }}
        <div v-for="field in col.fields">
          {{ field.type }} {{ field.order }}
        </div>
      </div>
    </div>
  </form>
</template>
