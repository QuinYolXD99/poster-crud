<template>
  <div>
    <div>
      <sb/>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div id="theform">
      <v-container fill-height fluid grid-list-xl>
        <v-layout justify-center wrap>
          <v-flex xs10 md7>
            <v-card color="white">
              <v-toolbar color="pink" dark>
                <v-toolbar-title>
                  Update Profile
                  <br>fill in the important information
                </v-toolbar-title>
                <br>

                <v-spacer></v-spacer>
              </v-toolbar>
              <br>
              <v-form>
                <v-container py-0>
                  <v-layout wrap>
                    <v-flex xs12 md4>
                      <v-text-field color="pink" label="UserName"/>
                    </v-flex>
                    <br>
                    <v-flex xs12 md4>
                      <v-text-field label="Password" color="pink"/>
                    </v-flex>
                    <br>

                    <v-flex xs12 md6>
                      <v-text-field label="First Name" color="pink"/>
                    </v-flex>
                    <br>
                    <v-flex xs12 md6>
                      <v-text-field label="Last Name" color="pink"/>
                    </v-flex>
                    <br>
                    <v-flex xs12 md6>
                      <v-text-field label="Contact Number" color="pink"/>
                    </v-flex>
                    <br>
                    <v-flex xs12 md6>
                      <v-text-field label="Email Address" color="pink"/>
                    </v-flex>
                    <br>
                    <v-flex xs12 text-xs-right>
                      <v-btn class="mx-0 font-weight-light" color="pink" dark>Update Profile</v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
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
                  <v-text-field label="Firstname" placeholder="Placeholder" outlined disabled></v-text-field>
                </div>
                <div>
                  <v-text-field label="Lastname" placeholder="Placeholder" outlined disabled></v-text-field>
                </div>
                <div>
                  <v-text-field label="Contact Number" placeholder="Placeholder" outlined disabled></v-text-field>
                </div>
                <div>
                  <v-text-field label="Email Address" placeholder="Placeholder" outlined disabled></v-text-field>
                </div>
                <div>
                  <v-text-field label="Username" placeholder="Placeholder" outlined disabled id="Uname"></v-text-field>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import sb from "@/components/Sidebar";
import axios from "axios"
export default {
  components: {
    sb
  },
  data() {
    return {
      message: "",
      dialog: true,
      uname: "",
      pword: "",
      lastname: "Pelino Dy",
      contactInfo: "09090909090",
      email: "dy@gmail.com",
      name: "HMPD",
      accountInfo:
        "Your personal information are just between you and the system admin :)"
    };
  },
  methods: {
    showProfiles() {
      let id = sessionStorage.getItem("id");
      var url = "https://localhost:4000/retrieveUserinfo";
      axios
        .post(url, id)
        .then(res => {
          console.log(res)
          this.uname = res.data.username;
          this.pword = res.data.password;
        })
        .catch(err => {
          if (err) {
            console.log(err)
            this.notify("error!!")
          }
        });
        
        
    },
    notify(msg) {
      this.$refs.notif.message(msg);
    }
  },
  mounted(){
    this.showProfiles()
  }
};
</script>

<style>
#dp {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin-left: 380px;
}
#sH {
  margin-top: 150px;
}
#theform {
  margin-left: 300px;
}
#cards2 {
  margin-right: 100px;
}
#crud {
  float: left;
  height: 780px;
}
</style>