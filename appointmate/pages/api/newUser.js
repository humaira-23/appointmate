import { MongoClient } from 'mongodb'


function handler(req, res){
    if(req.method=="POST")
    {
        const data=req.body;
        MongoClient.connect('mongodb+srv://humaira_2362:Nohman@7818@cluster0.0pzmkd6.mongodb.net/')
    }
}

export default handler;