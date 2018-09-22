<template>
  <v-toolbar app color="primary" class="main-toolbar" dark prominent>
 <!--     <v-toolbar-side-icon
        @click="$emit('input', !value)"
      /> -->

    <v-toolbar-title>
        <div class="toolbarLogo">
          <v-icon>{{ $route.meta.icon }}</v-icon>
        </div>
    </v-toolbar-title>
    <v-card-text>
      <div class="toolbarTitle">
        <p class="text-xs-center" style="margin-bottom: 0px !important;">{{$route.name}}</p>
      </div>
    </v-card-text>
  <!--  <v-spacer/> -->
<v-toolbar-items >
   <!--<v-toolbar-items>-->
      <v-menu offset-y v-if="isAuthenticated">
        <v-btn
		  flat
          class="mlst"
          small
          slot="activator"
		  top
		  right
		  round
		  fixed
        >
          <v-icon>
            settings
          </v-icon>
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile :to="{name: 'Профиль'}">
            <v-list-tile-title>Профайл</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="{name: 'ChangePassword'}">
            <v-list-tile-title>Сменить пароль</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="{name: 'Logout'}">
            <v-list-tile-title>Выйти</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>
<style>
  .main-toolbar {
    padding-bottom: 1px
  }
  .main-toolbar .v-toolbar__title {
    min-width: 64px !important;
  }
  .main-toolbar .logo {
    margin-top: 8px;
    max-height: 50px !important;
    max-width: 50px !important;
    width: auto;
    filter: grayscale(100%) contrast(0%) brightness(200%);
  }
</style>
<script type="text/babel">
  import config from '@/config'
  import {mapGetters} from 'vuex'
  export default {
    name: 'Toolbar',
    metaInfo: {
      title: 'My Awesome Webapp'
    },
    props: {
      value: {
        required: true
      }
    },
    computed: {
      config () {
        return config
      },
      hasMenu () {
        return Array.isArray(this.items) && this.items.length
      },
      menuItems () {
        return this.items
      },
      ...mapGetters('account', [
        'user',
        'isAuthenticated'
      ]),
      ...mapGetters([
      ])
    }
  }
</script>
<style scoped>
  .v-toolbar__title {
    text-align: center !important;
    align-items: center !important;
  }
  .v-toolbar__items .v-btn, .v-toolbar__items .v-menu, .v-toolbar__items .v-menu__activator{
    height: unset !important;
  }
  .mlst{
	margin-right: -30px;
  }
  .toolbarLogo {
    background: #fff;
    color: #0092ff;
    text-align: center;
    position: absolute;
    overflow: hidden;
    top: 20px;
    left: 10px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    font-size: 60px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;

    -webkit-box-shadow: 2px 2px 3px 0px rgba(50, 50, 50, 0.3);
    -moz-box-shadow:    2px 2px 3px 0px rgba(50, 50, 50, 0.3);
    box-shadow:         2px 2px 3px 0px rgba(50, 50, 50, 0.3);
  }
  .toolbarLogo i{
    font-size: 40px !important;
    height: auto !important;
    display: block !important;
    color: #0092ff;
    margin-top: 10px;
  }
  .toolbarTitle {
    font-size: 20px;
	text-align: left;
    font-weight: 500;
    letter-spacing: 0.02em;
    white-space: nowrap;
    overflow: hidden;
	margin-left: -80px;
    text-overflow: ellipsis;
  }
  .toolbar-button {
    font-size: 26px;
    line-height: 36px;
    color: #fff;
    margin-right: 15px;
  }
  </style>
