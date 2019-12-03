<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <sb />
        <v-list three-line subheader>
          <v-subheader id="sH">
            <img
              id="dp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWxkYJv9W_tCQfM49f2mSDGYFLgyL54_dfOapx0qkT-su9VjTTDw&s"
              alt="John"
            />
          </v-subheader>
          <br />
          <br />
          <br />
          <br />
          <v-divider></v-divider>
          <center>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <h1>{{"Welcome, "+name + " " + lastname}}</h1>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </center>
          <v-list-item>
            <v-list-item-content id="cards">
              <template>
                <v-card max-width="400" class="mx-auto">
                  <v-app-bar dark color="pink">
                    <v-spacer></v-spacer>
                    <v-toolbar-title>Personal Information</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-app-bar>

                  <v-container>
                    <v-row dense>
                      <v-col cols="12">
                        <v-card color="#385F73" dark>
                          <center>
                            <v-card-subtitle>
                              <v-icon>mdi-account</v-icon>
                              Full name: {{name + " " +lastname}}
                            </v-card-subtitle>
                            <v-card-subtitle>
                              <v-icon>mdi-account</v-icon>
                              Contact Number: {{contactInfo}}
                            </v-card-subtitle>
                            <v-card-subtitle>
                              <v-icon>mdi-account</v-icon>
                              Email Address: {{email}}
                            </v-card-subtitle>
                            <v-card-subtitle>
                              <v-icon>mdi-account</v-icon>
                              Username: {{uname}}
                            </v-card-subtitle>

                            
                          </center>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </template>
            </v-list-item-content>
            <v-list-item-content id="cards2">
              <template>
                <v-card max-width="400" class="mx-auto">
                  <v-app-bar dark color="pink">
                    <v-spacer></v-spacer>
                    <v-toolbar-title>Personal Information</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-app-bar>

                  <v-container>
                    <v-row dense>
                      <v-col cols="12">
                        <v-card color="#385F73" dark>
                          <center>
                            <v-card-subtitle>
                              {{accountInfo}}
                            </v-card-subtitle>
                          </center>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </template>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import sb from "@/components/Sidebar";
// import axios from "axios"
export default {
  components: {
    sb
  },
  data() {
    return {
      dialog: true,
      name: "Hannah Mae",
      lastname: "Pelino Dy",
      contactInfo: "09090909090",
      email: "dy@gmail.com",
      uname: "HMPD",
      accountInfo: "Your personal information are just between you and the system admin :)"
    }
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
#cards {
  margin-left: 100px;
}
#cards2 {
  margin-right: 100px;
}
#crud {
    float: left;
    height: 780px;
}
</style>