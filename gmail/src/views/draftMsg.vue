<template>
  <div>
    <h1>{{ msg.title }}</h1>
    <p>{{ sentTo }}</p>
    <p>{{ msg.date }}</p>
    <p>{{ msg.message }}</p>
  </div>
</template>

<script>
export default {
    props:["msg"],
    mounted(){
        this.messages.sentToMails.map(mail=>{
            this.sentTo=this.sentTo+mail+",";
        })
    },
    data(){
        return{
            messages:this.msg,
            sentTo:"",
        }
    }
}
</script>

<style>

</style>