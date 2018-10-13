function Router(){
    this.routes = {}
    this.currentHash = ""
}

var noop = function(){}

//路由注册
Router.prototype.route = function(hash,cb){
    this.currentHash = hash
    this.routes[this.currentHash] = cb || noop
}

//路由刷新
Router.prototype.refresh = function(){
    let hash = location.hash || "#position"
    this.currentHash = hash
    //console.log(this)
    this.routes[hash]()
    this.switchTabbar()
}

//高亮
Router.prototype.switchTabbar = function(){
    let hashs = ["#position","#search","#profile"]
    let index = hashs.indexOf(this.currentHash)
    $("nav li").eq(index).addClass("active").siblings().removeClass("active")
}

//路由切换监听
Router.prototype.init = function(hash){
    window.addEventListener("load",this.refresh.bind(this))
    window.addEventListener("hashchange",this.refresh.bind(this))
}

module.exports = Router