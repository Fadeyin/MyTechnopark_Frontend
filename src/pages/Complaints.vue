<template>
<v-container fluid grid-list-lg> 
 <v-layout row wrap>
  <v-flex xs12 sm6 offset-sm3 >
  <div v-for="(complaints, index) in complaints" :key="complaints.index" v-on:click="showOnCreate(complaints.pk)">
    <v-card
      style="margin-bottom: 6px !important;"
    >
	  <v-card-text>
		  <div class="left">
		  <div class="header">{{complaints.title}}</div>
          </div>
		  <div class="right"> 
		  <v-icon>fiber_new</v-icon>
		  </div>
		  </v-card-text>
      <v-card-actions>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="myMap.get(complaints.pk)">
            <span v-html="complaints.description"></span>
			<v-divider></v-divider>
			<span class="grey--text" style="font-size: 0.9em;" >Создание жалобы: {{changeData(complaints.time_creation)}}</span>
			<div v-for="(statuses, index) in complaints.statuses" :key="index" >
			<span class="grey--text" style="font-size: 0.9em;" >{{statuses.status_complaint}}: {{changeData(statuses.time_accept_status)}}</span>
			</div>
		  </v-card-text>
		  <div style="visibility: hidden">{{show}}</div>
        </v-slide-y-transition>
    </v-card>
	</div>
   </v-flex>
   <v-btn :to="{path: '/complaintsadd'}"  style="margin-bottom: 55px;"
        color="green lighten-2"
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
  import AddComplaints from '@/components/ads-message/addComplaints'
  Vue.component('my-add-AddComplaints', AddComplaints)
    export default {
      name: 'ComplaintsAdd',
      data () {
        return {
		  show: true,
		  myMap: false,
		  complaints: true,
		  statusType:[
		  {Status: "Просмотрено"},
		  {Status: "Принимается решение"},
		  {Status: "Принято решение"},
		  {Status: "Отказ"}]
        }
      },
	mounted () {
	this.getC();
    },
	methods: {
	getC () {
        Api.rest({
          url: 'communication/get_all_complaints/',
          method: 'get'
        })
          .then(response => {
            this.complaints = response;
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
