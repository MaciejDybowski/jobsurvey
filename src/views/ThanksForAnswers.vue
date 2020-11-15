<template>
  <div class="wrapperThanks">
    <v-card elevation="2">
      <v-card-title>Odpowiedziałeś już na tą ankietę, dziękujemy!</v-card-title>
      <v-card-actions
        ><router-link to="/">Strona główna</router-link></v-card-actions
      >
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.wrapperThanks {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  .v-card {
    width: 50%;
    padding: 20px 20px;
    margin-top: 20%;
    a {
      text-decoration: none;
    }
  }
}
</style>