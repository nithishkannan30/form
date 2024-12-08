const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());
 
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Nithish@30',
    database:'empl_db'
})

app.post('/submit',(req,res)=>{
    const {name,employeeid,email,phone,department,date,role}=req.body;
    const query='INSERT INTO employees (name,employe    eid,email,phone,department,date,role) VALUES(?,?,?,?,?,?,?)';
    connection.query(query,[name,employeeid,email,phone,department,date,role],(err,result)=>{
        if(!err){
            return res.status(200).json({message:'data inserted successfully',id:result.insertId})
        }
        return res.status(500).json({ message: 'Error inserting data', error: err });
    })
})

app.get('/users',(req,res)=>{
    const query='SELECT * FROM employees';
    connection.query(query,(err,result)=>{
        if(result){
            res.send(result);
        }else{
            res.send("ERROR");
        }
    })
})

connection.connect((err)=>{
    if(err){
        console.log("An error is Occurred while Connecting to the database:",err);
    }
    else{
        console.log("Database connected SuccessFully");
    }
})

app.get('/', (req, res) => {
    return res.send('hi');
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});
