import express from 'express';

const app = express();

app.get("/", (req,res) => {
    res.send("<h2>Hello There!</h2>");
})

const port = process.env.PORT || 8080

const server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);  
})
  