<script lang="ts" setup>
import {Column, Form, Row} from '~/types';
import FormButton from "~/components/Form/components/FormButton.vue";

const route = useRoute()

const {
  data: form,
  error
} = await useAsyncData<Form>('form', () => $fetch(`http://127.0.0.1:8000/api/v1/form/${route.params.id}`), {
  transform: (form: Form) => ({
    ...form,
    rows: form.rows.map(row => ({
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


const isMiddleColumn = (row: Row, col: Column,) => {
  return row.columns.length > 0 && col.order !== row.columns[row.columns.length - 1].order
}

const isFirstRow = (form: Form, row: Row) => {
  return form.rows.length > 0 && row.order === form.rows[0].order
}

type visibleLayers = {
  rows: boolean
  columns: boolean
  fields: boolean
}

const visibleLayers = ref<visibleLayers>({
  rows: true,
  columns: true,
  fields: false
})

const handleVisibleLayersChange = (layer: keyof visibleLayers) => {
  visibleLayers.value[layer] = !visibleLayers.value[layer]
}
const rowsAreVisible = computed(() => visibleLayers.value.rows)
const columnsAreVisible = computed(() => visibleLayers.value.columns)
const fieldsAreVisible = computed(() => visibleLayers.value.fields)


const addField = (row: Row, col: Column) => {
  console.log(row.order, col.order)
}

const addColumn = (form: Form, row: Row, index: number) => {
  console.log('add column', form.id, row.id, 'index', index ?? row.columns.length)
  const url = `/api/v1/form/${form.id}/row/${row.id}/column`
  console.log(url)

}

const addRow = (form: Form, row: Row, index: number) => {
  console.log(form.id, row.id, index)
  const url = `/api/v1/form/${form.id}/row`
  console.log(url)
}

</script>

<template>
  <div class="mx-auto max-w-4xl p-6 flex flex-col">
    <div class="flex gap-2 mb-2 mb-1">
      <form>
        <div class="flex gap-2">
          <label>
            <input v-model="visibleLayers.rows" type="checkbox">
            Rows
          </label>
          <label>
            <input v-model="visibleLayers.columns" type="checkbox">
            Columns
          </label>
          <label>
            <input v-model="visibleLayers.fields" type="checkbox">
            Fields
          </label>
        </div>
      </form>
    </div>
    <div class="flex flex-col">
      <!-- Form -->
      <form v-if="form" class="flex flex-col">
        <!-- Row wrapper -->
        <div v-for="row in form.rows" class="flex flex-col flex-1 ">
          <div v-if="isFirstRow(form, row) && rowsAreVisible"
               class="flex flex-col justify-center items-center border"
               @click="addRow(form, row, row.order)">
            <FormButton class="absolute">
              Add row
            </FormButton>
          </div>
          <!-- Row -->
          <div class="flex ">
            <div v-if="columnsAreVisible"
                 class="flex flex-col items-center justify-center border"
                 @click="addColumn(form, row, 0)">
              <FormButton class="absolute">
                Add column
              </FormButton>
            </div>
            <!-- Column wrapper -->
            <div v-for="col in row.columns" class="flex flex-1">
              <!-- Column -->
              <div class="flex flex-col flex-1">
                <!-- Field wrapper -->
                <div v-for="field in col.fields" class=" flex flex-col">
                  <!-- Field -->
                  <FormField :field="field"/>
                </div>
                <!-- border if amount of fields is less then the most amount of fields in this same row -->
                <!--                <div v-if="fieldsAreVisible"-->
                <!--                     @click="addField(row, col)"-->
                <!--                     class="flex flex-col items-center justify-center border">-->
                <!--                  <FormButton class="absolute ">-->
                <!--                    Add Field-->
                <!--                  </FormButton>-->
                <!--                </div>-->
              </div>
              <div v-if="columnsAreVisible && isMiddleColumn(row, col)"
                   class="flex flex-col  items-center justify-center border"
                   @click="addColumn(form, row, col.order + 1)">
                <FormButton class="absolute">
                  Add column
                </FormButton>
              </div>
            </div>
            <div v-if="columnsAreVisible"
                 class="flex flex-col  items-center justify-center border"
                 @click="addColumn(form, row, row.columns.length)">
              <FormButton class="absolute">
                Add column
              </FormButton>
            </div>
          </div>
          <div v-if="rowsAreVisible"
               class="flex flex-col justify-center items-center border"
               @click="addRow(form,row,row.order + 1)">
            <FormButton class="absolute">
              Add row
            </FormButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
