<template>
  <div>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="elevation-12">
              <div
                style="
                  display: block;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
                "
              >
                <svg
                  id="svg6"
                  version="1.1"
                  viewBox="0 0 24 24"
                  width="100"
                  height="100"
                >
                  <defs id="defs10" />
                  <path id="path2" d="M0 0h24v24H0V0z" fill="none" />
                  <g
                    transform="matrix(0.046875,0,0,0.04604639,-1.951887,-3.0598516)"
                    id="Layer_x0020_1"
                  >
                    <g id="_921457168">
                      <path
                        style="fill: #e0e0e0"
                        id="path2-8"
                        d="M 464.632,212.901 337.566,83.292 c -22.014,-22.454 -57.758,-22.454 -79.771,0 l -126.63,129.386 c -7.411,7.559 -7.411,19.563 0,27.122 l 38.359,39.127 25.5,24.232 c 7.628,7.114 19.18,7.114 26.808,0 l 51.219,-48.242 c 14.167,-13.338 35.744,-13.338 49.693,0 l 51.219,48.242 c 7.629,7.114 19.18,7.114 26.809,0 l 25.501,-24.232 38.359,-38.904 c 7.193,-7.337 7.193,-19.563 0,-27.122 z"
                      />
                      <path
                        style="fill: #616161"
                        id="path4"
                        d="m 58.804,367.853 198.991,202.973 c 22.013,22.452 57.757,22.452 79.771,0 L 536.557,367.853 c 34.437,-35.125 10.244,-45.574 -15.039,-70.029 L 490.35,267.59 c -7.409,-7.336 -19.18,-7.113 -26.808,0 l -51.218,48.242 c -14.169,13.339 -35.744,13.339 -49.694,0 L 311.411,267.59 c -7.575,-7.113 -19.233,-7.113 -26.809,0 l -51.219,48.242 c -14.167,13.339 -35.744,13.339 -49.693,0 L 132.471,267.59 c -7.576,-7.113 -19.233,-7.113 -26.809,0 l -28.77,27.123 c -26.37,24.899 -54.05,36.236 -18.088,73.14 z"
                      />
                    </g>
                  </g>
                </svg>
                <h1>Wavemaker Setup</h1>
              </div>
              <v-card-text>
                <p v-for="(fb, index) in Feedback" :key="index">{{ fb }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-row justify="center">
        <v-dialog v-model="LoginForm" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Getting Started</span>
              <v-card-text></v-card-text>
            </v-card-title>
            <v-card-text>
              If you have a wavemaker account put your details in here and it
              will sync your preferences

              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    required
                    v-model="login.email"
                  ></v-text-field>
                  <v-text-field
                    v-model="login.password"
                    label="Password*"
                    type="password"
                    required
                  ></v-text-field>
                  <v-alert v-if="login.message" border="top" color="error">{{
                    login.message
                  }}</v-alert>
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="primary" @click="logmein()"
                    >Connect to Wavemaker</v-btn
                  >
                </v-col>
              </v-row>

              <small>*indicates required field</small>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      LoginForm: false,
      login: {
        email: null,
        password: null,
        message: null,
      },
      Feedback: ["Setting Up"],
    };
  },
  methods: {
  async  logmein() {
      // need to do an ajax log in to wavemaker that will return the session info as JSON
      this.message = null;

 const postData = new FormData;
postData.append('email', this.login.email);
postData.append('password', this.login.password);
        await fetch(`https://wavemaker.co.uk/api/` , {
         method:"POST",
          body:postData })
            .then(response => {
                if (response.ok)
                {
                       console.log("Data Posted")
                       console.log("response",response)
                         return response;
                }
                else {
                  throw Error(`Server returned ${response.status}: ${response.statusText}`)
                }
            })
            .then(async (data) => 
            {
            console.log(data)
            let myresult= await data.text()
             console.log(myresult)
           myresult=JSON.parse(myresult)
               
            if (myresult.state === "success") {
            this.LoginForm = false;
              let mysettings = JSON.parse(myresult.settings)
              let dbfile= myresult.dbfile
              
                console.log(dbfile)
          
                let blob = await fetch(dbfile).then(r => r.blob())

                console.log(blob)

               await this.$root.importDB(blob)
                // just passa an object for now WILL NEED ADDRESSING LATER
                mysettings = { mode : "dark"}
            this.$root.AddRecord("Settings", mysettings);
            this.$root.interface.MainNavigationToggle = true;
           window.location="/" // forces the refresh of the system nicely
           //this.$router.push("/");
          } else {
            this.login.message = myresult.message;
          }

         
            }
            )
            .catch(err => {
                this.message = "There was a Problem Connecting : Check the console (f12)";
                console.error(err)
            });

/*
     
     var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://wavemaker.co.uk/api/", true);
      xhr.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );

      xhr.onreadystatechange = async () => {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
          let myresult = JSON.parse(xhr.responseText);
          if (myresult.state === "success") {
            this.LoginForm = false;
              let mysettings = JSON.parse(myresult.settings)
              let dbfile= myresult.dbfile
              
                console.log(dbfile)
          
                let blob = await fetch(dbfile).then(r => r.blob())

                console.log(blob)

               await this.$root.importDB(blob)
                // just passa an object for now WILL NEED ADDRESSING LATER
                mysettings = { mode : "dark"}
            this.$root.AddRecord("Settings", mysettings);
            this.$root.interface.MainNavigationToggle = true;
           window.location="/" // forces the refresh of the system nicely
           //this.$router.push("/");
          } else {
            this.login.message = myresult.message;
          }
        } else {
          this.login.message = "The Connection failed - are you online?";
        }
      };

      xhr.onerror = function () {
        this.message = "There was a Problem Connecting";
      };
      xhr.send(
        "email=" + this.login.email + "&password=" + this.login.password
      );]

      */
    },
    step1() {
      this.Feedback.push("Looking for existing config file");
      // ask for location of file with popup - or account info for
      this.LoginForm = true;
    },
  },
  mounted() {
    this.step1();
  },
};
</script>