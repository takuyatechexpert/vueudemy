var app = new Vue({
  el: '#app',
  data:{
    items: null,
    keyword: '',
    message: ''
  },

  watch:{
    keyword: function(newKeyword, oldKeyword){
      // console.log(newKeyword)
      this.message = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },


  created: function() {
    // mountedと機能は同じだがdomを取得しないのであればこちらの方が早い
    // axios.get('https://qiita.com/api/v2/schema?locale=ja')
    // this.keyword = 'JavaScript'
    // this.getAnswer()
    // 関数のため()が必要
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
    // 数値は秒数をミリ秒で記述している
    // 記述した時間の間は同じ処理を無視する
    
  },


  methods:{
    getAnswer: function(){
      if (this.keyword === '') {
        this.items = null
        this.message = ''
        return
      }
      
      this.message = 'Loading...'
      var vm = this
      var params = { page: 1, per_page: 20, query: this.keyword }
      axios.get("https://qiita.com/api/v2/items", {params})
      // paramsをつける事でパラメータを渡す事ができる

      // .then function(response)でapiからの値を使える様にする
      .then(function(response){
        console.log(response.data)
        vm.items = response.data
      }.bind(this))

      .catch(function(error){
        vm.message = 'Error' + error
      }.bind(this))
  
      .finally(function(){
        // finallyは通信に関する処理が終わった後に読み込まれる
        // // finallyは固有のもの
        // loadingは任意で決めた値
        vm.message = ''
      }.bind(this))
      // 例によてbindする
    },
  
    }

})