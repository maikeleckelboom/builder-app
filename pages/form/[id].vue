<script lang="ts" setup>
import {Form} from '~/types';

const route = useRoute()

const {
  data,
  error
} = await useAsyncData<Form>('form', () => $fetch(`http://127.0.0.1:8000/api/v1/form/${route.params.id}`))

if (error.value) {
  console.error(error.value)
}

type FocusLevel = 'rows' | 'columns' | 'fields' | 'none' | 'all'

const currentFocusLevel = ref<FocusLevel>('rows')

const handleFocusLevelChange = (level: FocusLevel) => {
  currentFocusLevel.value = level
}
</script>

<template>
  <div class="mx-auto max-w-4xl p-6 flex flex-col">
    <fieldset class="pb-2">
      <legend class="mb-1">Focus level</legend>
      <div class="flex gap-2">
        <button
            :class="{'bg-blue-100': currentFocusLevel === 'none'}"
            class="flex p-2"
            @click="handleFocusLevelChange('none')"
        >
          None
        </button>
        <button
            :class="{'bg-blue-100': currentFocusLevel === 'rows'}"
            class="flex p-2"
            @click="handleFocusLevelChange('rows')"
        >
          Rows
        </button>
        <button
            :class="{'bg-blue-100': currentFocusLevel === 'columns'}"
            class="flex p-2"
            @click="handleFocusLevelChange('columns')"
        >
          Columns
        </button>
        <button
            :class="{'bg-blue-100': currentFocusLevel === 'fields'}"
            class="flex p-2"
            @click="handleFocusLevelChange('fields')"
        >
          Fields
        </button>
        <button
            :class="{'bg-blue-100': currentFocusLevel === 'all'}"
            class="flex p-2"
            @click="handleFocusLevelChange('all')"
        >
          All
        </button>
      </div>
    </fieldset>

    <div class="flex flex-col">
      <!-- Form -->
      <form class="flex flex-col gap-2"
            v-if="data">
        <!-- Row wrapper -->
        <div v-for="row in data.rows" class="flex flex-col">
          <!-- Row -->
          <div class="flex gap-2 border">
            <div v-if="currentFocusLevel !== 'none' && ['columns', 'all'].includes(<string>currentFocusLevel)"
                 class="flex flex-col h-full gap-2 border bg-gray-200 ">
              <button class="flex p-2" type="button">Add col</button>
            </div>
            <!-- Column wrapper -->
            <div v-for="col in row.columns" class="flex flex-col flex-1">
              <!-- Column -->
              <div class="flex flex-col border gap-2">
                <!-- Field wrapper -->
                <div v-for="field in col.fields" class="border flex flex-col">
                  <!-- Field -->
                  <FormField :field="field"/>
                </div>
                <div v-if="currentFocusLevel !== 'none' && ['fields', 'all'].includes(<string>currentFocusLevel)"
                     class="flex flex-col gap-2 border bg-gray-200 ">
                  <button class="flex p-2 w-full justify-center" type="button">Add field</button>
                </div>
              </div>
            </div>
            <div v-if="currentFocusLevel !== 'none' && ['columns', 'all'].includes(<string>currentFocusLevel)"
                 class="flex flex-col h-full gap-2 border bg-gray-200 ">
              <button class="flex p-2" type="button">Add col</button>
            </div>
          </div>
          <div v-if="currentFocusLevel !== 'none'  && ['rows', 'all'].includes(<string>currentFocusLevel)"
               class="flex flex-col gap-2 border bg-gray-200 my-2 ">
            <button class="flex p-2 w-full justify-center" type="button">Add row</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
