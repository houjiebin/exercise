const searchTpl = require("../views/search.html")

const render = ()=>{
    $("main").html(searchTpl)
}
module.exports = {
    render
}