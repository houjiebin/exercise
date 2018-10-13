const list = ()=>{
    return $.ajax({
        url:"/api/position/list",
        success:(result)=>{
            return result
            //console.log(result) /api/listmore.json?pageNo=2&pageSize=15
        }
    })
}
module.exports = {
    list
}