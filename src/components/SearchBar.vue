<template>
  <!-- <v-app id="inspire"> -->
    <v-toolbar dense >
      <v-toolbar-title>State selection</v-toolbar-title>
      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-3"
        flat
        hide-no-data
        hide-details
        placeholder="What state are you from?"
      ></v-autocomplete>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
  <!-- </v-app> -->
</template>
<script>
export default {

  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      states: []
    };
  },
  watch: {
    search(val) {
      val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    }
  }
  ,mounted(){
      console.log(this.$parent.images);
      
      this.states = this.$parent.images.map(img=>img.caption)
      console.log(this.states);
      
  }
}
</script>


