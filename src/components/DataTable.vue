<template>

  <v-data-table
    :headers="headers"
    :items="data"
    fixed-header
    no-data-text="No records Yet"
    no-results-text="No results"
    :search="search"
    :items-per-page="10"
    class="elevation-1"
  ></v-data-table>
</template>
<script>
export default {
  props: {
    headers: Array,
    data: Array,
    search:String
  }
}
</script>
