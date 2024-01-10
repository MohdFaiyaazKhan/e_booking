const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://faraz:faraz@cluster0.vcjjaw3.mongodb.net/amaan?retryWrites=true&w=majority")

.then(()=>{
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`no connection`);
})