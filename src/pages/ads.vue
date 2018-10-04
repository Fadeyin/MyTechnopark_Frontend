<template>
<v-container fluid grid-list-lg> 
 <v-layout row wrap>
  <v-flex xs12 sm6 offset-sm3 >
  <div v-for="(news) in news" :key="news.id" v-on:click="showOnCreate(news.id)">
    <v-card
	  hover
      style="margin-bottom: 12px !important;"
    >
      <v-card-title primary-title>
		  <div class="timeBlock" style="position:absolute; top:8px; right: 10px;">{{ news.time }},{{ news.date }}</div>
          <div class="headline">{{ news.title }}</div>
          <span class="grey--text">{{ news.link }}</span>	  
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <div class="left">
		  <v-chip outline color="green">
            <v-avatar class="teal">
              <img
                src="https://is5-ssl.mzstatic.com/image/thumb/Purple117/v4/e3/7a/f8/e37af865-7a07-286e-7033-e02bd846814f/mzl.zeymfhnn.jpg/246x0w.jpg"
                alt="John"
              >
            </v-avatar>
            Администрация
          </v-chip>
        </div>
        <v-spacer></v-spacer>
		<div style="visibility: hidden">{{ show }}</div>
        <div class="right">   
		<v-icon>{{ myMap.get(news.id) ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>  
        </div>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="myMap.get(news.id)">
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
		  news: true,
		  myMap: false,
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
			var myMap = new Map();
				this.news.forEach(function(news_item) 
				{					
					news_item.id==0 ? myMap.set(news_item.id, true) : myMap.set(news_item.id, false);
				})
				this.myMap = myMap;
          })
      },
	  showOnCreate(id){
	  this.show=!this.show
		var myMap = this.myMap;
		myMap.set(id, !myMap.get(id))
		this.myMap = myMap;
	  }
	},
	};
</script>


