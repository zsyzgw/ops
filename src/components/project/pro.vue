<template>
  <div class="app-container">
    <!--搜索框-->
    <div class="search">
      <b>项目：</b>
      <el-select v-model="status" placeholder="请选择状态" no-data-text="暂无数据，请等待加载">
        <el-option label="ALL" value="all"></el-option>
        <el-option label="我打" value="open"></el-option>
        <el-option label="记返费" value="closed"></el-option>
      </el-select>

      <el-button style="margin-top: 10px" type="primary" plain icon="el-icon-search" @click="submitSearch()">
        搜索
      </el-button>
    </div>

    <ex-table
      ref="table1"
      v-loading="listLoading"
      element-loading-text="加载中，请稍后..."
      :data="data"
      :search-method="fetchRemoteData"
      :page-size="3"
      :page-sizes="[3, 5, 10]">
      <!--<el-table-column label="ID" prop="id"/>-->
      <el-table-column label="服务名" prop="name"/>
      <el-table-column prop="url" label="git地址" />

      <el-table-column label="版本号" prop="version"/>


     <!--<el-table-column label="操作" prop="number"/>-->



    </ex-table>
    <!-- <el-button @click="$refs.table1.setCurrentPage(1)">回到首页</el-button> -->
  </div>
</template>
<script>
  import ExTable from './index.js'
  import axios   from 'axios'
  import API from "../../api/api_user"
  export default {
    components: {ExTable},
    data() {
      return {
        listLoading: false,
        status: '',
        lastSearchParameters: {},
        data: [

       ],
      }
    },
    methods: {
      // 在此操作对查询参数进行转换
      updateLastSearchParams() {
        this.handleSearchParams('state', this.status)
      },
      handleSearchParams(queryParamName, sourceParam) {
        if (!sourceParam.length) {
          delete(this.lastSearchParameters[queryParamName])
        } else {
          this.lastSearchParameters[queryParamName] = sourceParam
        }
      },
      // 防止不同接口分页参数不同
      updateLastSearchPages(currentPage, pageSize) {
        // 此处对请求页码参数进行转换
        currentPage && (this.lastSearchParameters.page = currentPage)
        pageSize && (this.lastSearchParameters.per_page = pageSize)
      },
      // 数据获取渲染
      fetchRemoteData(currentPage, pageSize) {
        console.log("fuck")
        if (this.listLoading) return
        this.listLoading = true
        this.updateLastSearchPages(currentPage, pageSize)
        console.log('lastSearchParameters', this.lastSearchParameters)

        API.pro({params: this.lastSearchParameters}).then(response => {
          // console.log("thor")
          console.log(typeof(response))
          console.log(response.length)
          for (var i=0;i<response.length;i++ ){
            console.log(response[i]["fields"])
            this.data.push(response[i]["fields"])
          }
          // this.data = response
        //  console.log(this.data[0]["fields"])
          this.$refs.table1.pagination.total = response.length
           this.listLoading = false
        }).catch(err => {
          this.$message.error(err)
          this.data = []
          this.$refs.table1.pagination.total = 0
          this.listLoading = false
        })
      },
      submitSearch() {
        this.updateLastSearchParams()
        this.fetchRemoteData(1)
      },
      filterTag(value, row) {
        return row.tag === value
      }
    },
    mounted() {
      this.$refs.table1.fetchData()
    }
  }
</script>
<style scoped>
  .app-container {
    margin: 20px;
  }
</style>

