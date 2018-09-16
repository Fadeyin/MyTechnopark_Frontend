<template>

</template>

<script>
    export default {
      name: 'AdsMessage',
      data () {
        return {
          dialog: false
        }
      }
    }


</script>



<style scoped>
  .flex.offset-sm3 {
    padding: 5px 12px;
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
