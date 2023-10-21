type Field = {
    id: number
    order: number
    type: string
    label: string
    value: string
    category: string
    name: string
    model: string
    component: string
  }

  type Column = {
    id: number
    order: number
    type: string
    fields: Field[]
  }

  type Row = {
    id: number
    order: number
    type: string
    columns: Column[]
  }

  type Form = {
    id: number
    order: number
    name: string
    rows: Row[]
  }

  export type { Field, Column, Row, Form }
