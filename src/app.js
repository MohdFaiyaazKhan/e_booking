const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")

require("./db/conn")
const Bookings = require("./models/bookings")

const port = process.env.PORT || 3000

const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path))
app.set("view engine", "hbs")
app.set("views", template_path)
hbs.registerPartials(partials_path)




// Route for the index
app.get('/index', async (req, res) => {
  try {
    const currentDate = new Date();
    const upcomingDates = await Bookings.aggregate([
      {
        $addFields: {
          convertedDate: {
            $dateFromString: {
              dateString: '$date' // Assuming 'date' is the field with the date string
            }
          }
        }
      },
      {
        $match: {
          convertedDate: { $gte: currentDate } // Match dates greater than or equal to the current date
        }
      },
      {
        $sort: { convertedDate: 1 } // Sort by date in ascending order
      },
      {
        $limit: 2 // Limit the results to 5 upcoming dates (adjust as needed)
      }
    ]);
    // console.log(upcomingDates)
    res.render('index', { upcomingDates });
  } catch (error) {
    res.send('Error fetching upcoming dates from the database');
  }
});


// Route for the homepage
app.get('/', async (req, res) => {
  try {
    const currentDate = new Date();
    const upcomingDates = await Bookings.aggregate([
      {
        $addFields: {
          convertedDate: {
            $dateFromString: {
              dateString: '$date' // Assuming 'date' is the field with the date string
            }
          }
        }
      },
      {
        $match: {
          convertedDate: { $gte: currentDate } // Match dates greater than or equal to the current date
        }
      },
      {
        $sort: { convertedDate: 1 } // Sort by date in ascending order
      },
      {
        $limit: 2 // Limit the results to 5 upcoming dates (adjust as needed)
      }
    ]);

    res.render('index', { upcomingDates });
  } catch (error) {
    res.send('Error fetching upcoming dates from the database');
  }
});




//add
app.get("/add",(req,res)=>{
    res.render("add")
})

//search
app.get("/search",(req,res)=>{
    res.render("search")
})

//update
app.get("/update",(req,res)=>{
    res.render("update")
})

//delete
app.get("/delete",(req,res)=>{
    res.render("delete")
})

//404
app.get("/404",(req,res)=>{
    res.render("404")
})

//Handle form submission
app.post("/index",(req,res)=>{
    const{
        pname,
        fname,
        date,
        time,
        bill,
        category,
        ph,
        total,
        adv,
        rem

    } = req.body

    //create a new document
    const bookings = new Bookings({
        pname,
        fname,
        date,
        time,
        bill,
        category,
        ph,
        total,
        adv,
        rem,
    })

      // Save to MongoDB
  bookings.save(function (err) {
    if (err) {
      res.redirect("404");
    } else {
      res.redirect("index");
    }
  });

})

// checks wheather the bill number is taken or not
app.post('/checkBillAvailability', async (req, res) => {
  const { bill } = req.body;
  try {
    const existingBill = await Bookings.findOne({ bill: bill });
    res.json({ exists: !!existingBill }); // Send true if the bill exists, false otherwise
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


  // Handle search based on the date
app.post('/search', (req, res) => {
    
    Bookings.find({date:req.body.date}, (err, data) => {
      if (err) {
        res.redirect("404");
      } else {
        res.render('results', { bookingregisters: data }); // Render a results page with the found data
      }
    });
  });


  // Access the document based on the bill no.
  app.post('/update', (req, res) => {
    
    Bookings.find({bill:req.body.bill}, (err, data) => {
      if (err) {
        res.redirect("404");
      } else {
        res.render('updating', { bookingregisters: data }); // Render a results page with the found data
      }
    });
  });




// updating the data

  app.post('/updating', async (req, res) => {
    const {
      pname,
      fname,
      date,
      time,
      category,
      ph,
      total,
      adv,
      rem,
      bill // Assuming 'bill' is used to identify the document to update
    } = req.body;
  
    try {
      // Find the existing record by 'bill' value
      const existingData = await Bookings.findOne({ bill: bill });
  
      if (!existingData) {
        return res.send('No matching document found for the provided bill value.');
      }
  
      // Update only the fields that have changed
      const updatedData = {
        pname: pname || existingData.pname,
        fname: fname || existingData.fname,
        date: date || existingData.date,
        time: time || existingData.time,
        category: category || existingData.category,
        ph: ph || existingData.ph,
        total: total || existingData.total,
        adv: adv || existingData.adv,
        rem: rem || existingData.rem,
      };
  
      // Perform the update in the database
      const updatedRecord = await Bookings.findOneAndUpdate(
        { bill: bill }, // Query to find the document
        { $set: updatedData }, // Updated data
        { new: true } // Return the updated document
      );
  
      res.redirect("index");
    } catch (error) {
      res.redirect("404");
    }
  });
  
      
     // Handle search based on the Bill no. to delete

app.post('/delete', async (req, res) => {
  try {
    const { bill } = req.body;

    // Find data based on the provided bill number
    const data = await Bookings.find({ bill });

    if (data.length === 0) {
      // If no data found, render an error page or display a message
      return res.render('404', { message: 'Bill number does not exist.' });
      // OR
      // return res.redirect('/errorPage');
    }

    // If data found, render a page with the found data
    res.render('deleting', { bookingregisters: data });
  } catch (error) {
    res.render('404', { message: 'Error occurred while searching for data.' });
    // OR
    // res.redirect('/errorPage');
  }
});




// Route to delete data filtered by bill number
app.post('/deleting', async (req, res) => {
  const {
    pname,
    fname,
    date,
    time,
    category,
    ph,
    total,
    adv,
    rem,
    bill // Assuming 'bill' is used to identify the document to delete
  } = req.body;

 
  try {
    const deletedData = await Bookings.findOneAndDelete({ bill: req.body.bill });

    if (!deletedData) {
      return res.redirect("404");
    }

    res.redirect('/index')
  } catch (error) {
    res.redirect("404");
  }
});


app.listen(port, ()=>{
    console.log(`Server is running at ${port}`)
})