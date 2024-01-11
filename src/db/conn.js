const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI)

.then(()=>{
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`no connection`);
})