<template>

  <el-dialog :visible.sync="showresult">
    <div>
      <div  v-for="(value,key) in results" >
        <p >{{ value}} {{key}}</p>

      </div>
    </div>
  </el-dialog>

</template>

<script>
  export default {
    data () {
      return {
        showresult: true,

        results: {"id":2}
      }


    }

  }



</script>
