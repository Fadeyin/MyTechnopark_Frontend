<template>
  <v-flex md6 offset-md3 xs12 class="mt-3">
    <v-card>
      <panel-title :caption="'Создать объявление'" ></panel-title>
      <v-card-text>
        <v-form  ref="form">
          <v-text-field
              autofocus
              label="title"
              v-model="title"
              required
              counter="80"
          ></v-text-field>
          <v-text-field
              label="link"
              v-model="link"
              ref="link"
              required
              counter="80"
          ></v-text-field>
          <v-textarea
              label="body"
              v-model="body"
              counter="250"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="primary" @click="newsAdd" >Создать</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script type="text/babel">
  import _ from 'lodash'
  import { mapMutations } from 'vuex'
  import Api from '@/api'
  import config from '@/config'
  import PanelTitle from '@/components/panel-title.vue'
  export default {
    name: 'AddNews',
    data () {
      return {
        title: '',
        link: '',
        body: '',
        appName: config.APP_NAME
      }
    },
    methods: {
      newsAdd () {
        Api.rest({
          method: 'post',
          url: 'news-add',
          data: {
            title: this.title,
            link: this.link,
            body: this.body
          }
        })
          .then((response) => {
            this.newsAddProcedure(response.data)
            this.$router.push({name: 'ads'})
          })
      },
	  ...mapMutations({
        newsAddProcedure: 'account/newsAdd'
      })
    },
    components: {
      PanelTitle
    }
  }
</script>
