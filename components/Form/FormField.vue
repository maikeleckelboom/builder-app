<script lang="ts" setup>
import {Field} from '~/types';

/**
 * This component is used to render a single field.
 * It can be all kinds of fields, like text, number, date, etc.
 * The role of this component is to render the correct component
 * based on the component prop of the field.
 */

const {field} = defineProps<{
  field: Field
}>()
</script>

<template>
  <div class="p-4">
    {{ field.model }}
  </div>
</template>
