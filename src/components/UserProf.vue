<template>
  <!-- <Sidebar/> -->
  <div>
    <sb/>

    <v-card class="mx-auto" max-width="400">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWxkYJv9W_tCQfM49f2mSDGYFLgyL54_dfOapx0qkT-su9VjTTDw&s"
      >
        <v-card-title>{{name}}</v-card-title>
      </v-img>

      <v-card-text class="text--primary">
        <div>
          <v-text-field label="Firstname" placeholder="Placeholder" outlined></v-text-field>
        </div>
        <div>
          <v-text-field label="Lastname" placeholder="Placeholder" outlined></v-text-field>
        </div>
        <div>
          <v-text-field label="Contact Number" placeholder="Placeholder" outlined></v-text-field>
        </div>
        <div>
          <v-text-field label="Email Address" placeholder="Placeholder" outlined></v-text-field>
        </div>
        <div>
          <v-text-field label="Username" placeholder="Placeholder" outlined></v-text-field>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text>Save</v-btn>

        <v-btn color="orange" text>Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import sb from "@/components/Sidebar";
export default {
  components: {
    sb
  },
  data() {
    return {
      name: "User"
    };
  }
};
</script>
