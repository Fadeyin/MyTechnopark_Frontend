<template>
  <v-app :key="1">
    <toolbar @input="toolbarInput" v-model="drawer"/>
    <loading-spinner :loading="loading"></loading-spinner>
    <message/>
    <bottom-nav />
    <v-content class="mt-3">
      <router-view/>
    </v-content>
  </v-app>
</template>
<style>
@import "~font-awesome/css/font-awesome.min.css";
  html {
    overflow-y: auto
  }
  a {
    text-decoration-skip-ink: none;
    text-underline-position: under;
  }
</style>

<script type="text/babel">

import LoadingSpinner from '@/components/app/loading-spinner.vue'
import Message from '@/components/app/message.vue'
import Toolbar from '@/components/app/toolbar.vue'
import Sidebar from '@/components/app/sidebar.vue'
import BottomNav from '@/components/app/bottom-nav.vue'
import Api from '@/api'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'My Technopark',
    // all titles will be injected into this template
    titleTemplate: '%s | My Technopark'
  },
  data () {
    return {
      drawer: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters('account', [
      'isAuthenticated',
      'token',
      'user'
    ])
  },
  created () {
    Api.onGetToken = () => this.token
    Api.onStartRequest = () => {
      this.loading = true
    }
    Api.onCompleteRequest = () => {
      this.loading = false
    }
    Api.onMessage = (message) => {
      this.setMessage(message)
    }
    Api.onError = (errorMessage, errorStatus, errorFields) => {
      this.loading = false
      let statusMessage = ''
      switch (errorStatus) {
        case 500:
          statusMessage = 'Внутренняя ошибка'
          break
        case 401:
          statusMessage = 'Отказ в авторизации'
          break
        case 404:
          statusMessage = 'Данные не найдены'
          break
        case 422:
          statusMessage = 'Ошибка в данных'
          let fieldsMessage = errorFields.map(e => e.message)
          if (fieldsMessage.length) {
            errorMessage += ': <ul><li>' + fieldsMessage.join('</li><li>') + '</li><ui>'
            statusMessage = null
          }
          break
      }
      this.setError(errorMessage + (statusMessage ? '<br>Cтатус: ' + statusMessage : ''))
      if (errorStatus === 401) {
        this.logout()
      }
    }
  },
  methods: {
    sidebarInput (value) {
      this.drawer = value
    },
    toolbarInput (value) {
      this.$refs.sidebar.toggle(this.drawer)
    },
    ...mapMutations([
      'setMessage',
      'setError'
    ]),
    ...mapActions([
    ])
  },
  components: {
    LoadingSpinner, Message, Toolbar, Sidebar, BottomNav
  }
}
</script>
