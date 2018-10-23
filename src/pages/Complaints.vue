<template>
<v-container fluid grid-list-lg> 
 <v-layout row wrap>
  <v-flex xs12 sm6 offset-sm3 v-if="proverkaPustoty(complaints)">
  <div v-for="(complaints, index) in complaints" :key="complaints.index" v-on:click="showOnCreate(complaints.pk)">
    <v-card
      style="margin-bottom: 6px !important;"
    >
	  <v-card-actions>
	  <div class="left">
	  <div class="header">{{complaints.title}}</div>
	  <div class="grey--text" style="font-size: 0.9em;">Текущий статус: {{tekData(complaints.statuses)}}</div>
       </div> 
		 <v-spacer></v-spacer>  
		  <div class="right">
				<div><v-icon medium :color="tekColor(complaints.statuses,statusType)">{{tekIcon(complaints.statuses,statusType)}}</v-icon></div>
			</div>
	  </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="myMap.get(complaints.pk)">
            <span v-html="complaints.description"></span>			
			<div class="grey--text" style="font-size: 0.9em;" >Создание жалобы: {{changeData(complaints.time_creation)}} </div>
			<div style="visibility: hidden">{{show}}</div>
			<span v-if="proverkaPustoty(complaints.statuses)" style="font-size: 1em;">История изменения жалоб:</span>
			<div v-for="(statuses, index) in complaints.statuses" :key="index" >
			<span class="grey--text" style="font-size: 0.9em;" >{{changeData(statuses.time_accept_status)}}  {{statuses.status_complaint}}</span>
			</div>
				<div v-if="!proverkaPustoty(complaints.statuses)" class="blue--text" v-on:click="update(complaints.pk,complaints.title,complaints.description)"> 
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
           У вас нет жалоб, вы можете создать жалобу нажав на кнопку "+".
        </v-card-text>
	  </v-card>
    </v-flex>
   <v-btn :to="{path: '/complaints/add'}"  style="margin-bottom: 55px;"
        color="green lighten-2"
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
      name: 'Complaints',

      data () {
        return {
		  show: true,
		  myMap: false,
		  coloolr: "blue",
		  complaints: true,
		  statusType:[
		  {Status: "Не просмотрена",sIcon: "fiber_new", colorI: "indigo"},
		  {Status: "Просмотрено",sIcon: "visibility", colorI:"orange darken-2"},
		  {Status: "В процессе",sIcon: "update", colorI:"primary"},
		  {Status: "Принято решение",sIcon: "check_circle_outline", colorI:"green"},
		  {Status: "Отказ", sIcon: "block", colorI:"red"}]
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
			this.$router.push({ path: `/complaints/update/${id}&&${title}&&${des}`
			})
        }
	 },
	  components: {
      PanelTitle,
    }
	};
</script>
