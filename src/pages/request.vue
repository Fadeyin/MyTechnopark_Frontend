<template>
<v-container fluid grid-list-lg> 
 <v-layout row wrap>
  <v-flex xs12 sm6 offset-sm3 v-if="proverkaPustoty(request)">
  <div v-for="(request, index) in request" :key="request.index" v-on:click="showOnCreate(request.pk)">
    <v-card
      style="margin-bottom: 6px !important;"
    >
	  <v-card-actions>
	  <div class="left">
	  <div class="header">{{request.title}}</div>
	  <div class="grey--text" style="font-size: 0.9em;">Текущий статус: {{tekData(request.statuses)}}</div>
       </div> 
		 <v-spacer></v-spacer>  
		  <div class="right">
				<div><v-icon medium :color="tekColor(request.statuses,statusType)">{{tekIcon(request.statuses,statusType)}}</v-icon></div>
			</div>
	  </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="myMap.get(request.pk)">
            <span v-html="request.description"></span>			
			<div class="grey--text" style="font-size: 0.9em;" >Создание жалобы: {{changeData(request.time_creation)}} </div>
			<div style="visibility: hidden">{{show}}</div>
			<span v-if="proverkaPustoty(request.statuses)" style="font-size: 1em;">История изменения заявок:</span>
			<div v-for="(statuses, index) in request.statuses" :key="index" >
			<span class="grey--text" style="font-size: 0.9em;" >{{changeData(statuses.time_accept_status)}}  {{statuses.status_complaint}}</span>
			</div>
				<div v-if="!proverkaPustoty(request.statuses)" class="blue--text" v-on:click="update(request.pk,request.title,request.description)"> 
				<v-icon right>edit</v-icon>	Изменить 
				</div>
		  </v-card-text>
        </v-slide-y-transition>
    </v-card>
	</div>
   </v-flex> 
   <v-flex v-else>
      <v-card>
		<v-card-text>
           У вас нет заявок, вы можете создать заявку нажав на кнопку "+".
        </v-card-text>
	  </v-card>
    </v-flex>
   <v-btn :to="{path: '/request/add'}"  style="margin-bottom: 55px;"
        color="orange darken-3"
        fab
        fixed
        bottom
        right
      >
        <v-icon medium>add</v-icon>
     </v-btn>
  </v-layout>
 </v-container> 
</template>

<script>
  import Vue from 'vue'
  import Api from '@/api'
  import {mapGetters} from 'vuex'
  import PanelTitle from '@/components/panel-title.vue'
    export default {
      name: 'RequestPage',

      data () {
        return {
		  show: true,
		  myMap: false,
		  coloolr: "blue",
		  request: true,
		  statusType:[
		  {Status: "Новая",sIcon: "fiber_new", colorI: "indigo"},
		  {Status: "Просмотрена",sIcon: "visibility", colorI:"orange darken-2"},
		  {Status: "Одобрена",sIcon: "thumb_up", colorI:"green lighten-2"},
		  {Status: "Отказано", sIcon: "thumb_down", colorI:"red lighten-2"}]
        }
      },
	mounted () {
	this.getC();
    },
	methods: {
	getC () {
        Api.rest({
          url: 'communication/get_all_request/',
          method: 'get'
        })
          .then(response => {
            this.request = response;
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
	  },
	  tekData(b){
	  var d = {status_complaint: "Не просмотрена"};
	  var a = b[b.length-1];
	  if(a === undefined)
		return d.status_complaint;
	  else 
		return a.status_complaint;
	  },
	  tekIcon(b,c){
	  var d = c[0];
	  var a = b[b.length-1];
	  if(a === undefined)
		return d.sIcon;
	  else {
		for(var i=0;i<c.length;i++){
		var e = c[i];
		if(a.status_complaint == e.Status)
			return e.sIcon;
		}
	  }
	  },
	  tekColor(b,c){
	  var d = c[0];
	  var a = b[b.length-1];
	  if(a === undefined)
		return d.colorI;
	  else {
		for(var i=0;i<c.length;i++){
		var e = c[i];
		if(a.status_complaint == e.Status)
			return e.colorI;
		}
	  }
	  },
	  proverkaPustoty(a){
	  var d = a[0];
	  if(d === undefined)
		return false
	  else
	    return true
	  },
	  update(id,title,des){
			this.$router.push({ path: `/request/update/${id}&&${title}&&${des}`
			})
        }
	 },
	  components: {
      PanelTitle,
    }
	};
</script>