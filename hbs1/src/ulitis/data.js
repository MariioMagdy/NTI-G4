
const request= require("request");
const postsUrl="https://jsonplaceholder.typicode.com/posts"
const getData = (callback)=>{
    request({url:postsUrl,json:true}, 
        (err,body)=>{
            if(err) callback(err,undefined)
            else callback(undefined,body)
        }
        )
}
module.exports={
    getData

}