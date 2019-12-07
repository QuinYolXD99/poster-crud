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
  >
    <template v-slot:item.action="{ item }">
      <StatsInfo
        :location="item.location"
        :datasets="[item.Waste ,item.Crime , item.Accidents]"
      />
    </template>

  </v-data-table>
</template>
<script>
import StatsInfo from "./StatsInfo";
export default {
  props: {
    headers: Array,
    data: Array,
    search: String
  }
  , components: {
    StatsInfo
  }
}
</script>
