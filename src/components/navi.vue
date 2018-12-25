<template>

<div >

  <div  class="e" >
  <a  href="http://git.woda.ink" target="_blank">
    <h3 style="align-content: center">导航一</h3>
     <p><span>{{thor.name}} </span></p>
     <p><span>{{thor.desc}} </span></p>
  </a>
  </div>

 <div  class="e">
   <a  href="http://jenkins.woda.ink" target="_blank">
     <h3 style="align-content: center">导航二</h3>
     <p><span> jenkins.woda.ink </span></p>
     <p><span> 持续集成 </span></p>
   </a>
 </div>




</div>
</template>

<script>
    import API from "../api/api_user"

     export default {
      data() {
        return {
          thor: '',

        }
      },
      methods: {
        get_info() {
          API.navi().then((result) =>{
           // console.log("fuck")
            console.log()

            this.thor = result[0]["fields"]
            console.log(this.thor)

           // console.log(this.menu.name)
          },function(error) {
            this.message.error('未知错误')
          }).catch(function(error) {
            console.log(error);
          })
        },

        },

       created () {
         this.get_info();


       }
     }


</script>

<style scoped>
  div{float: left}
  .e{
    width: 200px;
    height: 120px;
    margin: 50px;
    background: plum;
    border-radius: 50% / 50%;
   text-align: center;
  }


</style>

