import positionTpl from '../views/position.html'
import positionModel from '../models/position'
// async await必须对promise才有用
const render = async() => {
  //document.querySelector('main').innerHTML = positionTpl
  let result = await positionModel.list()
  //console.log(result)
  let list = result.content.data.page.result
  //console.log(list)
  //编译模板传进去  在执行渲染函数，把数据传进去
  let template = Handlebars.compile(positionTpl)
  let html = template({list})
  $("main").html(html)
}
export default{
  render
}