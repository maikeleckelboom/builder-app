<script lang="ts" setup>

</script>

<template>
  <button class="flex p-1 border  rounded-full " type="button" :class="$slots.label?.()?.length ? '' : 'bg-gray-200'">
    <span :class="$slots.label?.()?.length ? 'px-1' : ''">
      <slot name="label">
      </slot>
    </span>
    <Icon v-if="!$slots.label?.()?.length" name="ic:round-plus"/>
    <span class="sr-only">
      <slot></slot>
    </span>
  </button>
</template>
