<template>
  <v-flex md6 offset-md3 xs12 class="mt-3">
    <v-card>
      <panel-title :caption="'Создать жалобу'" ></panel-title>
      <v-card-text>
        <v-form  ref="form">
          <v-text-field
              autofocus
              label="Заголовок"
              v-model="title"
              required
              counter="80"
          ></v-text-field>
		  <v-combobox
          v-model="select"
          :items="items"
          chips
          label="Выберете тип заявки"
          ></v-combobox>
          <v-textarea
              label="Описание"
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
	  select: 'Programming',
        items: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify'
        ],
        title: '',
        body: '',
		author: '',
		list: true,
        appName: config.APP_NAME
      }
    },
    methods: {
		getReq () {
        Api.rest({
          url: 'communication/get_request_list/',
          method: 'get'
        })
          .then(response => {
            this.list = response;
          })
      },
	
      newsAdd () {
        Api.rest({
          method: 'post',
          url: 'communication/create_new_complaint/',
          data: {
            title: this.title,
            description: this.body
          }
        })
          .then((response) => {
            this.newsAddProcedure(response.data)
            this.$router.push({path: '/complaints'})
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
