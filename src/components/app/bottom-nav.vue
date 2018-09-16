<template>
<div>
  <v-bottom-nav
    :active.sync="bottomNav"
    :value="true"
    app
    color="white"
  >
    <v-btn
      color="blue"
      flat
      href="#/ads"
      value="ads"
    >
      <v-icon>fa-bell-o</v-icon>
    </v-btn>

    <v-btn
      color="blue"
      flat
      href="#/request"
      value="request"
    >
      <v-icon>fa-pencil-square-o</v-icon>
    </v-btn>

    <v-btn
      color="blue"
      flat
      href="#/chats"
      value="chats"

    >
      <v-icon>fa-comments-o</v-icon>
    </v-btn>

    <v-btn
      color="blue"
      flat
      value="complaints"
    >
      <v-icon>fa-exclamation-triangle</v-icon>
    </v-btn>

    <v-btn
      color="blue"
      flat
      value="more"
    >
      <v-icon>fa-bars</v-icon>
    </v-btn>
	</v-bottom-nav>
  </div>           
  </template>
  
<style>
  .main-sidebar .list__group__items--no-action .list__tile {
    padding-left: 36px !important;
  }

</style>
<script type="text/babel">
  export default {
    name: 'BottomNav',
    data () {
      return {
        bottomNav: 'ads'
      }
    },
  }
</script>

<style scoped>
  .v-bottom-nav .v-btn {
    min-width: unset !important;
    opacity: 1 !important;
   /* width: 19% !important; */
  }
  .v-bottom-nav {
    box-shadow: 0 0.1px 14px 3px rgba(0, 0, 0, 0.12) !important;
  }
  </style>
