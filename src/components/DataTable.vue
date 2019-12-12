<template>

  <v-data-table
    :headers="headers"
    :items="data"
    fixed-header
    no-data-text="No records Yet"
    no-results-text="No results"
    :search="search"
    :sort-by="['item.total']"
    :sort-desc="[true]"
    :items-per-page="page==0?10:12"
    class="elevation-1"
  >
    <template v-slot:item.action="{ item }">
      <StatsInfo
        v-if="item.total"
        :location="item.location?item.location:''"
        :category="item.category?item.category:''"
        :month="item.month?item.month:''"
        :datasets="mode=='Location'?[item.Waste ,item.Crime , item.Accidents]:[item.reports.Waste,item.reports.Crime,item.reports.Accidents]"
      />
    </template>

  </v-data-table>
</template>
<script>
import StatsInfo from "./StatsInfo";
export default {
  props: {
    mode:String,
    headers: Array,
    data: Array,
    search: String,
    page: Number
  }
  , components: {
    StatsInfo
  },
}
</script>
