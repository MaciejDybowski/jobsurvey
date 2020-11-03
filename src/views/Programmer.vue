<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-sheet rounded="lg">
              <div class="nav">
                <div class="link-box">
                  <router-link to="/">Raport ogólny</router-link>
                </div>
                <div class="link-box active">
                  <router-link to="/">Programista</router-link>
                </div>
                <div class="link-box">
                  <router-link to="/">Administrator / DevOps</router-link>
                </div>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item v-for="n in 5" :key="n" link>
                  <v-list-item-content>
                    <v-list-item-title> List Item {{ n }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> Refresh </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: ["Badanie IT", "Strona bulldoga"],
  }),
};
</script>

<style lang="scss">
.nav {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px 10px;

  .link-box {
    height: 100%;
    border: 2px solid gray;
    border-radius: 5px;
    margin: 10px 10px;
    padding: 5px 7px;
    text-align: center;

    a {
      text-decoration: none;
      color: gray;
    }

    &:hover {
      border: 2px solid purple;
    }
  }

  .active {
    a {
      color: purple !important;
    }
    border: 2px solid purple !important;
  }
}
</style>
