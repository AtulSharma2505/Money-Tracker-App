const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

const port = process.env.PORT || 5000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;


mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.q7w9k.mongodb.net/MoneyTrackerDb`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

const transactionSchema = new mongoose.Schema({
    category: String,
    amount: Number,
    info: String,
    date: Date,
  });

const Transaction = mongoose.model("Transaction", transactionSchema);


app.post("/add", (req, res) => {
    const { category_select, amount_input, info, date_input } = req.body;
  
    const newTransaction = new Transaction({
      category: category_select,
      amount: amount_input,
      info: info,
      date: date_input,
    });
  
    
  });

app.get('/', (req, res) =>{
    res.set({
        "Allow-access-Allow-origin":'*'
    })
    return res.redirect('index.html')
});

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
});

