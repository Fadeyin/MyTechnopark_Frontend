<template>
 <v-layout row wrap>
  <v-flex xs12 sm6 offset-sm3>
  <div v-on:click="show = !show">
  <v-card>
	<v-card-title primary-title>
	  <div slot="header">{{Complaints.Title}}</div>
			</v-card-title primary-title>
	 <v-slide-y-transition>
          <v-card-text v-show="show">
            {{Complaints.Body}}
          </v-card-text>
        </v-slide-y-transition>
	</v-card>
	</div>	
   </v-flex>
  <v-btn :to="{name: ''}"  style="margin-bottom: 55px;"
        color="green"
        fab
        fixed
        bottom
        right
      >
        <v-icon>add</v-icon>
     </v-btn>
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
		  show: false,
		  news: true,
		  myMap: false,
		  Complaints:{
		  Title: "Болит голова!",
		  Body: "Не могу уже голова взрывается :(",
		  Status:{
		  NewStatus:"2012-04-23T23:25:43.511Z",
		  ViewStatus:false,
		  ProcessStatus:false,
		  SuccessStatus:false,
		  FalseStatus:false,
		  },
		  DTime: "2012-04-23T23:25:43.511Z",
		  }
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
				this.myMap = myMap;
          })
      },
	  showOnCreate(id){
	  this.show=!this.show
		var myMap = this.myMap;
		myMap.set(id, !myMap.get(id))
		this.myMap = myMap;
	  },
	  changeData(time){
	  var t = new Date(time)
	  var options = {
		hour: 'numeric',
		minute: 'numeric',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		timezone: 'UTC',
		};
		var ti = (t.toLocaleString("ru", options));
		return ti;
	  }	  
	},
	};
</script>


