<script lang="ts" setup>
import {Column, Form, Row} from '~/types';
import FormButton from "~/components/Form/components/FormButton.vue";

const route = useRoute()

const {
  data,
  error
} = await useAsyncData<Form>('form', () => $fetch(`http://127.0.0.1:8000/api/v1/form/${route.params.id}`), {
  transform: (data: Form) => ({
    ...data,
    rows: data.rows.map(row => ({
      ...row,
      state: {
        isHovering: false
      }
    }))
  })
})

if (error.value) {
  console.error(error.value)
}

type FocusLevel = 'rows' | 'columns' | 'fields' | 'none' | 'all'

const currentFocusLevel = ref<FocusLevel>('all')

const handleFocusLevelChange = (level: FocusLevel) => {
  currentFocusLevel.value = level
}

const rowsAreVisible = computed(() => currentFocusLevel.value !== 'none' && ['rows', 'all'].includes(currentFocusLevel.value))
const columnsAreVisible = computed(() => currentFocusLevel.value !== 'none' && ['columns', 'all'].includes(currentFocusLevel.value))
const fieldsAreVisible = computed(() => currentFocusLevel.value !== 'none' && ['fields', 'all'].includes(currentFocusLevel.value))

const isMiddleColumn = (row: Row, col: Column,) => {
  return row.columns.length > 0 && col.order !== row.columns[row.columns.length - 1].order
}

const isFirstRow = (form: Form, row: Row) => {
  return form.rows.length > 0 && row.order === form.rows[0].order
}

type EditMode = 'layout' | 'fields'

const editMode = ref<EditMode>('layout')

const handleEditModeChange = (mode: EditMode) => {
  editMode.value = mode
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
      <form v-if="data" class="flex flex-col ">
        <!-- Row wrapper -->
        <div v-for="row in data.rows" class="flex flex-col flex-1 group ">
          <div v-if="isFirstRow(data, row) && rowsAreVisible"
               class="flex flex-col justify-center items-center border">
            <FormButton class="absolute">
              Add row
            </FormButton>
          </div>
          <!-- Row -->
          <div class="flex border">
            <div v-if="columnsAreVisible"
                 class="flex flex-col border items-center justify-center">
              <FormButton class="absolute">
                Add column
              </FormButton>
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
                <div v-if="fieldsAreVisible"
                     class="flex flex-col   ">
                  <FormButton class="rounded-none p-2">
                    <template #label>
                      Add field
                    </template>
                  </FormButton>
<!--                  <button>-->
<!--                    Add Field-->
<!--                  </button>-->
                </div>
              </div>
              <div v-if="columnsAreVisible && isMiddleColumn(row, col)"
                   class="flex flex-col border items-center justify-center">
                <FormButton class="absolute">
                  Add column
                </FormButton>
              </div>
            </div>
            <div v-if="columnsAreVisible"
                 class="flex flex-col border items-center justify-center">
              <FormButton class="absolute">
                Add column
              </FormButton>
            </div>
          </div>
          <div v-if="rowsAreVisible"
               class="flex flex-col justify-center items-center border">
            <FormButton class="absolute">
              Add row
            </FormButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
