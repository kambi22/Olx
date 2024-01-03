require('./mysqlcon')
require('./uploadImage')
let express = require('express')
let cors = require('cors')
let app = express();

let path = require('path')
let dirPath = path.join(__dirname, 'GetImage')
const filelpath = `${dirPath}/secondImage.jpeg`
const createReadStream = require('fs').createReadStream;
const process = require('process');
const fs = require('fs');
const multer = require("multer");
const { google } = require("googleapis");
const upload = multer();
const serviceAccount = require('./creadential.json');
const { error } = require('console');
const { resourceLimits } = require('worker_threads');
const { format } = require('mysql2');
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('public'));

app.get('/nodefile', (req, resp) => {
    resp.send('Done')
    console.log('okay hai');

});


app.post('/cars',(req, resp) => {
    const data = req.body
    console.log(data)
    connections.query('INSERT INTO car SET ?', data, (err, result) => {
        if (err) {
            console.log('error', err)
        } else {
            resp.send('done')
            console.log('uploaded')
        }
    })
});
app.post('/mobiles', (req, resp) => {
    const data = req.body

    console.log('filelpath', data)
    connections.query('INSERT INTO mobile SET ?', data, (err, result) => {
        if (err) {
            console.log('error', err)
        } else {
            resp.send('done')
            console.log('uploaded')
        }
    })
});
app.get('/mobiles', (req, resp) => {
    connections.query('SELECT * FROM mobile ORDER BY id DESC',(err, result) => {
        if (err) {
            resp.send('error is comming')
        } else {
            resp.send(result)
            console.log("done")
        }
    })
})
app.get('/cars', (req, resp) => {
    connections.query('SELECT * FROM car ORDER BY id DESC ', (err, result) => {
        if (err) {
            resp.send('error is comming')
        } else {
            resp.send(result)
            console.log("done")
        }
    })
})
app.get("/mobileget/:id", (req, resp) => {
    const data = req.params.id
    console.log(req.params.id)
    connections.query('SELECT * FROM mobile WHERE id=?', data, (err, result) => {
        if (err) {
            resp.send('error is comming')
        } else {
            resp.send(result)
        }
    })
})
app.get("/carget/:id", (req, resp) => {
    const data = req.params.id
    console.log(req.params.id)
    connections.query('SELECT * FROM car WHERE id=?', data, (err, result) => {
        if (err) {
            resp.send('error is comming')
        } else {
            resp.send(result)
            console.log
        }
    })
})
app.post('/mobileliked',(req,resp)=>{
    const like = req.body;
    console.log('like',like)
    connections.query('INSERT INTO mobileads SET ?',like,(err,result)=>{
        if(err){
            console.log('eror from backend liked',err)
        }else{
            resp.send('done')
            console.log('done',result)
        }
    })
 })
app.post('/carliked',(req,resp)=>{
    const like = req.body;
    console.log('like',like)
    connections.query('INSERT INTO carads SET ?',like,(err,result)=>{
        if(err){
            console.log('eror from backend liked',err)
        }else{
            resp.send('done')
            console.log('done',result)
        }
    })
 })



app.get('/search', (req, res) => {
    const { product, location } = req.query;
    
    let queryMobile = "SELECT * FROM mobile WHERE product=? AND location=? ";
    let queryCar = "SELECT * FROM car WHERE product=? AND location=? ";
    
    connections.query(queryMobile, [product, location], (err, mobileResult) => {
        if (err) {
            console.error('Error executing car query: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }  
       
    connections.query(queryCar, [product, location], (err, carResult) => {
        if (err) {
            console.error('Error executing car query: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }   
       

        const combineResult ={mobileResult,carResult}
        res.send(combineResult)
    });
    });
    });


    app.post('/user',(req,resp)=>{
        const detail = req.body;
    
        connections.query('INSERT INTO user SET ?',detail,(err,result)=>{
            if(err){
                console.log('eror from backend liked',err)
            }else{
                resp.send('done')
                console.log('done',result)
            }
        })
     })
     app.get('/user',(req,resp)=>{

        connections.query("SELECT * FROM user",(err,result)=>{
            if(err){
                resp.send("error",err)
            }else{
                resp.send(result)
              
            }
        })
     })
    
 app.delete('/user',(req,resp)=>{

        connections.query("DELETE FROM user",(err,result)=>{
            if(err){
                resp.send("error",err)
            }else{
                resp.send('DELETED')
               
            }
        })
 })
 
 app.get('/filtermobile/:min/:max', (req, resp) => {
    const min = req.params.min;
    const max = req.params.max;
    console.log('Range data: min =', min, 'max =', max);

    const query = 'SELECT * FROM mobile WHERE price BETWEEN ? AND ?';
    console.log('Executing query:', query, 'with values:', min, max);

    connections.query(query, [min, max], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            resp.status(500).send('Error retrieving data');
        } else {
            resp.send(result);
            
        }
    });
});

app.post('/datetime',(req,resp)=>{

    connections.query('INSERT INTO test VALUES(CURRENT_DATE(),CURRENT_TIME(),NOW())',(err,result)=>{
        if(err){
            resp.send('error',err)
        }else{
            resp.send(result)
        }
    })
})


    
  
  





app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function () {
    console.log('Server started on port ' + app.get('port'));
});