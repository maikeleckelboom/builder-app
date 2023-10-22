<script lang="ts" setup>

</script>

<template>
  <button class="flex p-2 border bg-gray-200 rounded-full " type="button">
    <span :class="$slots.label?.()?.length ? 'p-2' : ''">
      <slot name="label">
      </slot>
    </span>
    <Icon v-if="!$slots.label?.()?.length" name="ic:round-plus"/>
    <span class="sr-only">
      <slot></slot>
    </span>
  </button>
</template>
