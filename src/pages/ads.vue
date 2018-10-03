<template>
<v-container fluid grid-list-lg> 
 <v-layout row wrap>
  <v-flex xs12 sm6 offset-sm3 >
  <div v-for="(news, index) in news" :key="news.index" v-on:click="showOnCreate()">
    <v-card
	  
	  hover
      style="margin-bottom: 12px !important;"
    >
      <v-card-title primary-title>
        <div >
          <div class="headline">{{ news.title }}</div>
          <span class="grey--text">{{ news.link }}</span>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <div class="left">
          <div class="timeBlock">{{ news.time }}</div>
          <div class="dateBlock">{{ news.date }}</div>
        </div>
        <v-spacer></v-spacer>
        <div class="right">
          <v-chip light>
            <v-avatar class="teal">
              <img
                src="https://is5-ssl.mzstatic.com/image/thumb/Purple117/v4/e3/7a/f8/e37af865-7a07-286e-7033-e02bd846814f/mzl.zeymfhnn.jpg/246x0w.jpg"
                alt="John"
              >
            </v-avatar>
            Администрация
          </v-chip>
        </div>
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
            <span v-html="news.body"></span>
          </v-card-text>
        </v-slide-y-transition>
    </v-card>
	</div>
   </v-flex>
  <v-btn :to="{name: 'Создать объявление'}" style="margin-bottom: 55px;"
        color="yellow"
        fab
        fixed
        bottom
        right
      >
        <v-icon>add</v-icon>
      </v-btn>
  </v-layout>
 </v-container> 
</template>

<script>
  import Vue from 'vue'
  import Api from '@/api'
  import AddNews from '@/components/ads-message/add'
  Vue.component('my-add-news', AddNews)
    export default {
      name: 'AdsPage',
      data () {
        return {
		  show: false,
		  news: true
        }
      },
	mounted () {
      this.getNews()
    },
	methods: {
	getNews () {
        Api.rest({
          url: 'news',
          method: 'get'
        })
          .then(response => {
            this.news = response.data
          })
      },
	  showOnCreate(){
	  this.show = !this.show
	  }
	},
	};
</script>


