const homeTpl = require('../views/home.html')

const render = () => {
  document.querySelector('#root').innerHTML = homeTpl
  changeTab()
}

const changeTab = ()=>{
  $("nav li").on("tap",function(){
    let hash = ["#position","#search","#profile"]
    location.hash = hash[$(this).index()]
    $(this).addClass("active").siblings().removeClass("active")
  })
}

module.exports = {
  render
}
