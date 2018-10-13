//const profileTpl = require("../views/profile.html")
import profileTpl from "../views/profile.html"
const render = ()=>{
    $("main").html(profileTpl)
}
export default{
    render
}