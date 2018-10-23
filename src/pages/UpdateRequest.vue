// UpdateComplaints.vue

<template>
<v-container fluid grid-list-lg> 
  <v-flex md6 offset-md3 xs12 class="mt-3">
    <v-card>
      <panel-title :caption="'Радактировать жалобу'" ></panel-title>
      <v-card-text>
        <v-form  ref="form">
          <v-text-field
              autofocus
              label="Заголовок "
              v-model="title"
              required
              counter="80"
          ></v-text-field>
          <v-textarea
              label="Описание"
              v-model="description"
              counter="250"
          ></v-textarea>	
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn block round color="primary" @click="UpdateComplaints">Обновить</v-btn>
		<v-btn fab color="error" @click="ComplaintsDel"><v-icon medium>delete_forever</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
  </v-container> 
</template>

<script type="text/babel">
  import _ from 'lodash'
  import Vue from 'vue'
  import {mapMutations} from 'vuex'
  import Api from '@/api'
  import config from '@/config'
  import PanelTitle from '@/components/panel-title.vue'
  
  export default {
    name: 'ComplaintsUpdate',
    data () {
      return {
	      title: this.$route.params.title,
          description: this.$route.params.des,
		  pk: this.$route.params.id
      }
    },
    methods: {
		UpdateComplaints() {
        Api.rest({
          url: 'communication/update_complaint/',
          method: 'put',
		  data: {
		    pk: this.pk,
			title: this.title,
			description: this.description
          }
        })
          .then(response => {
            this.$router.push({path: '/complaints'})
          })
      },
      ComplaintsDel () {
        Api.rest({
          method: 'delete',
          url: 'communication/drop_complaint/',
          data: {
		    pk: this.pk,
          }
        })
          .then((response) => {
            this.$router.push({path: '/complaints'})
          })
      }
    },
    components: {
      PanelTitle
    }
  }
</script>

