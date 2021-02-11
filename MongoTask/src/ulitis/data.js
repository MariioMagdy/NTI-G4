
const request= require("request");
const postsUrl="http://medical.marwa-radwan.com/api/blog"

const getSingleItem=(id,callback)=>{
    request({url:`${postsUrl}/${id}`,json:true}, 
        (err,data,body)=>{
            if(err) callback(err,undefined)
            else if(data.err) callback("server error",undefined)
            else{
                callback(undefined,body)
                // getComments(id ,body,(err,res)=>{
                //     alldata={post:body,comments:res}
                //     callback(undefined,alldata)
                // })
            } 
        }
        )
}

module.exports={
    
getSingleItem
}