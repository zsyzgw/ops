<template>
  <div >
  <el-table
    v-loading="loading2"
    element-loading-text="加载中，请稍后..."
    :data="data.slice((currentPage1-1)*pageSize,currentPage1*pageSize)"

    row-style="height:35px"
    cell-style="padding:0"
    style="font-size: 12px"  >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="name"
      label="服务名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="service_class"
      label="服务类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="service_pro"
      label="所属项目"
      width="120">
    </el-table-column>
    <el-table-column
      prop="url"
      label="git地址"
      width="350">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">修改
        </el-button >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
      </template>
    </el-table-column>

  </el-table>


  <div class="paginationClass">
    <el-pagination
      @size-change="handleSizeChange1"
      @current-change="handleCurrentChange1" :current-page="currentPage1"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total1">
    </el-pagination>

  </div>
  </div>

</template>

<script>
    import API from "../../api/api_user"
    export default {
      data () {
        return {
          total1: 0,
          currentPage1:1,
          pageSize: 10,
          data: [],
          loading2: true
      }
      },
      methods:{
        handleSizeChange1: function(pageSize) { // 每页条数切换
          this.pageSize = pageSize
          console.log(this.pageSize)
          this.handleCurrentChange1(this.currentPage1);
        },
        handleCurrentChange1: function(currentPage) {//页码切换
          this.currentPage1 = currentPage
          // this.currentChangePage(this.data,currentPage)

        },
        handleCurrentChange2: function(currentPage){
          this.currentPage = currentPage;
        },

        //分页方法（重点）
        currentChangePage(list,currentPage) {
          let from = (currentPage - 1) * this.pageSize;
          let to = currentPage * this.pageSize;
          this.data = [];
          for (; from < to; from++) {
            if (list[from]) {
              this.data.push(list[from]);
            }
          }
        },

        fetchRemoteData(currentPage, pageSize) {
          console.log("fuck")
          if (this.listLoading) return
          this.listLoading = true
          // this.updateLastSearchPages(currentPage, pageSize)
          // console.log('lastSearchParameters', this.lastSearchParameters)

          API.pro().then(response => {
            // console.log("thor")
            console.log(typeof(response))
            console.log(response.length)
            for (var i=0;i<response.length;i++ ){
              console.log(response[i]["fields"])
              this.data.push(response[i]["fields"])
            }
            this.loading2 = false
            //  console.log(this.data[0]["fields"])
            this.total1 = response.length
              // this.listLoading = false
          },function (error) {
            this.$message.error("failed");
            this.loading2= false;

            }
          ).catch(err => {
            this.$message.error("请求异常")
            this.loading2=false
            this.data = []
            this.total1 = 0
            // this.listLoading = false
          })
        },
      },

      created () {
        this.fetchRemoteData()
      }

    }
</script>

<style scoped>

</style>
