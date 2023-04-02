const express = require("express")
const app = express()


app.get("/" , (req , res)=>{
    console.log("hi")
    res.sendFile(home)
    
})

app.listen(3000)   