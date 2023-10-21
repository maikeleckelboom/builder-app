<script lang="ts" setup>
type FormComponent = {
  id: number
  type: string
  label: string
  value: string
}

const props = defineProps<FormComponent>()
</script>

<template>
  <div class="grid gap-1">
    <label>{{ props.label }}</label>
    <input type="text" :value="props.value"/>
  </div>
</template>

<style>

</style>

