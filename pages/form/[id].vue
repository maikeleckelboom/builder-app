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

const currentFocusLevel = ref<FocusLevel>('all')

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
      <form v-if="data"
            class="flex flex-col ">
        <!-- Row wrapper -->
        <div v-for="row in data.rows" class="flex flex-col flex-1">
          <!-- Row -->
          <div class="flex  border">
            <div v-if="currentFocusLevel !== 'none' && ['columns', 'all'].includes(<string>currentFocusLevel)"
                 class="flex flex-col border items-center justify-center">
              <button class="flex p-2 bg-gray-200 border rounded-full" type="button">
                <Icon name="ic:round-plus"/>
                <span class="sr-only">Add col</span>
              </button>
            </div>
            <!-- Column wrapper -->
            <div v-for="col in row.columns" class="flex flex-1">
              <!-- Column -->
              <div class="flex flex-col border flex-1">
                <!-- Field wrapper -->
                <div v-for="field in col.fields" class="border flex flex-col">
                  <!-- Field -->
                  <FormField :field="field"/>
                </div>
                <div v-if="currentFocusLevel !== 'none' && ['fields', 'all'].includes(<string>currentFocusLevel)"
                     class="flex flex-col border justify-center items-center">

                  <button class="flex p-2 border bg-gray-200 rounded-full" type="button">
                    <Icon name="ic:round-plus"/>
                    <span class="sr-only">Add field</span>
                  </button>
                </div>
              </div>
              <div v-if="
                currentFocusLevel !== 'none' && ['columns', 'all'].includes(<string>currentFocusLevel)
                && row.columns.length > 0 &&  col.order !== row.columns[row.columns.length - 1].order
              "
                   class="flex flex-col border items-center justify-center">
                <button class="flex p-2 bg-gray-200 border rounded-full" type="button">
                  <Icon name="ic:round-plus"/>
                  <span class="sr-only">Add col</span>
                </button>
              </div>
            </div>

            <div v-if="currentFocusLevel !== 'none' && ['columns', 'all'].includes(<string>currentFocusLevel)"
                 class="flex flex-col border items-center justify-center">
              <button class="flex p-2 bg-gray-200 border rounded-full" type="button">
                <Icon name="ic:round-plus"/>
                <span class="sr-only">Add col</span>
              </button>
            </div>

          </div>
          <div v-if="currentFocusLevel !== 'none'  && ['rows', 'all'].includes(<string>currentFocusLevel)"
               class="flex flex-col justify-center items-center border">
            <button class="flex p-2 w-fit border bg-gray-200 justify-center rounded-full" type="button">
              <Icon name="ic:round-plus"/>
              <span class="sr-only">Add row</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
