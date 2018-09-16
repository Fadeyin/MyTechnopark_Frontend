<template>
<v-layout row wrap>
  <v-flex xs12 sm6 offset-sm3 v-on:click="dialog = true">
    <v-card
	  v-for="(news) in news"
      style="margin-bottom: 10px !important;"
    >
      <v-card-title primary-title>
        <div>
          <div class="headline">{{ news.title }}</div>
          <span class="grey--text">{{ news.link }}</span>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <div class="left">
          <div class="timeBlock">{{ news.at }}</div>
          <div class="dateBlock">{{ news.at }}</div>
        </div>
        <v-spacer></v-spacer>
        <div class="right">
          <v-chip light>
            <v-avatar class="teal">
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              >
            </v-avatar>
            {{ news.autor }}
          </v-chip>
        </div>
      </v-card-actions>
    </v-card>
  </v-flex>
  <v-btn :to="{name: 'Создать объявление'}"
		class="btnpad"
        color="yellow"
        fab
        fixed
        bottom
        right
		
      >
        <v-icon>add</v-icon>
      </v-btn>
    <!--- Начало Модального окно -->
    <v-dialog
      v-model="dialog"
      width="500"
      v-for="(news) in news"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{ news.title }}
        </v-card-title>

        <v-card-text>
          <span v-html="news.body"></span>
        </v-card-text>
		<v-card-text>
          <span v-html="news.link"></span>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="left">
            <div class="timeBlock">{{ news.at }}</div>
            <div class="dateBlock">{{ news.at }}</div>
          </div>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Конец Модального окна -->
  </v-layout>
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
          dialog: false,
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
      }
	},
	};
</script>

<style scoped>
  .flex.offset-sm3 {
    padding: 5px 12px;
  }
  .btnpad {
	margin-bottom: 55px;
  }
  .headline {
    margin-bottom: 0px;
    font-size: 18px !important;
  }
  .grey--text {
    font-size: 13px !important;
  }
  .application {
    line-height: 1.2 !important;
  }
  .v-card__title--primary {
    padding-top: 10px;
  }
  .v-card__title {
    padding: 10px;
  }
  .left {
   /* padding: 5px 10px 10px 20px; */
  }
  .timeBlock {
    font-weight: 700;
    font-size: 18px;
   /* line-height: 22px; */
  }
  .dateBlock {
    font-size: 12.5px;
  }
  .authorName {
    display: block;
    padding-right: 5px;
    text-align: right;
    font-size: 12.5px;
    padding-top: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
   /* margin-left: 15%; */
  }
  .avatarBlock {
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: 35px;
  /*  width: 55px;
    height: 55px; */
    box-sizing: border-box;
    border: 1px solid #e8e8e8;
    text-align: center;
    line-height: 40px;
    font-size: 30px;
    overflow: hidden;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }
  .avatarBlock i {

  }
</style>
