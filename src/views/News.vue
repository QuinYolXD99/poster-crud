
<template>
  <v-card height="100%" color="#EFEBE9">
    <br />
    <br />
    <br />
    <div v-if="!news.length">
      <v-sheet color="transparent" class="px-3 pt-3 pb-3">
        <v-skeleton-loader class="mx-auto" max-width="500" type="card"></v-skeleton-loader>
      </v-sheet>
    </div>
    <div v-else v-for="(article,i) in news" :key="i">
      <v-card max-width="700" class="mx-auto">
        <v-card-text>
          <v-list-item>
            <v-list-item-content>
              <p class="title d-inline-block">{{article.title}}</p>
              <v-list-item-subtitle>{{new Date(article.publishedAt).toLocaleString()}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img v-if="article.urlToImage" :src="article.urlToImage" height="300"></v-img>

          <v-card-text class="black--text">{{article.description}}</v-card-text>

          <v-card-actions>
            <v-chip class="ma-2" small color="indigo" text-color="white">
              <v-avatar left>
                <v-icon small>mdi-account-circle</v-icon>
              </v-avatar>
              {{article.source.name}}
            </v-chip>
            <v-spacer></v-spacer>
            <v-btn text outlined small>read more</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
      <br />
    </div>
    <center>
      <v-btn v-if="news.length"  @click="getNews" text small>More</v-btn>
    </center>
  </v-card>
</template>
<script>
export default {
  inject: ["theme"],
  data() {
    return {
      news: []
    };
  },
  methods: {
    getNews() {
      var counties = [
        "ph",
        "us",
        "my",
        "au",
        "gb"
      ];

      var url = `https://newsapi.org/v2/top-headlines?country=${
        counties[Math.floor(Math.random() * counties.length)]
      }&apiKey=8a8cad1953be4387a9853da2d0aa80c8`;
      this.$axios
        .get(url)
        .then(res => {
          res.data.articles.map(article => {
            this.news.push(article);
          });
        })
        .catch(err => {
          console.log(err);
          this.getNews();
        });
    }
  },
  mounted() {
    this.getNews();
  }
};
</script>
