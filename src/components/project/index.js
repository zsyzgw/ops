import { Table, Pagination } from 'element-ui'
import Vue                   from 'vue'

export default {
  name: 'ExTable',
  mixins: [Table],
  props: {
    showPagination: {
      type: Boolean,
      default: true
    },
    paginationLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => [10, 25, 50, 100]
    },
    searchMethod: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      pagination: null
    }
  },
  methods: {
    setCurrentPage(page) {
      this.pagination.currentPage = page
      this.fetchData()
    },
    setPageSize(size) {
      this.pagination.pageSize = size
      this.pagination.currentPage = 1
      this.fetchData()
    },
     fetchData() {
      this.searchMethod(this.pagination.currentPage, this.pagination.pageSize)
    },
    mountPagination() {
      const container = document.createElement('div')
      const parent = this.$el.parentNode
      if (parent.lastChild === this.$el) {
        const line = document.createElement('p')
        parent.appendChild(line)
        parent.appendChild(container)
      } else {
        parent.insertBefore(container, this.$el.nextSibling)
      }
      const Pager = Vue.extend(Pagination)
      this.pagination = new Pager({
        components: { Pagination },
        propsData: {
          pageSize: this.pageSize,
          pageSizes: this.pageSizes,
          layout: this.paginationLayout,
          total: 0,
          currentPage: 1
        }
      })
      this.pagination.$on('current-change', this.setCurrentPage)
      this.pagination.$on('size-change', this.setPageSize)
      this.pagination.$mount(container)
    }
  },
  mounted() {
    if (this.showPagination) {
      this.mountPagination()
    }
  },
  beforeDestroy() {
    this.pagination.$off('current-change', this.setCurrentPage)
    this.pagination.$off('size-change', this.setPageSize)
  }
}
