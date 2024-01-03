require('./mysqlcon')
let express = require('express')
let cors = require('cors');
const multer = require('multer');
const { google } = require("googleapis");
const fs = require('fs');
const path = require('path');
const serviceAccount = require('./creadential.json');
let app = express();
app.use(express.json())

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + '-' + Date.now() + '.jpg')
        }
    })

}).single('image')

app.post('/savefile', upload, (req, resp) => {
    const filename = req.file.filename
    const filePath = req.file.path
    const originalname = req.file.originalname
    const mimeType = req.file.mimetype
    const size = req.file.size
    const data = req.file.fieldname
    console.log('name:', filename, 'path:', filePath, 'orignal name=', originalname, 'meme Type', mimeType, 'size', size, 'stream', data)




    if (fs.existsSync(filePath)) {
        resp.send('file hai')
    } else {
        resp.send("file nahi hai")
    }

});


app.post('/sendmobile', (req, resp) => {
    resp.send('sendmobler')
})


app.post('/uploadDrive', upload, (req, resp) => {
    const filename = req.file.filename
    const filePath = req.file.path
    const mimeType = req.file.mimetype
    const originalname = req.file.originalname



    const jwtClient = new google.auth.JWT({
        email: serviceAccount.client_email,
        key: serviceAccount.private_key,
        scopes: ['https://www.googleapis.com/auth/drive'],
    });


    // Authorize the JWT client
    jwtClient.authorize((err, tokens) => {
        if (err) {
            console.error('Error authorizing JWT client:', err);
            return;
        }

        const drive = google.drive({ version: 'v3', auth: jwtClient });



        const fileMetadata = {
            name: filename, // Name of the uploaded file
            parents: ['1gniS7-ovTEGJDl9B3-CgmQy_rCB2EFcy'], //f
        };

        const media = {
            mimeType: mimeType, // MIME type of the image
            body: fs.createReadStream(`${filePath}`), // Path to your local image file
        };

        drive.files.create(
            {
                resource: fileMetadata,
                media: media,
                fields: 'id',
            },
            (err, file) => {
                if (err) {
                    console.error('Error uploading image:', err);
                    resp.send('Internet connection is not available')
                } else {

                    resp.send('File Uploaded Successfully')
                    console.log('Image uploaded, to drive Suceessfully File ID:', file.data.id);
                    const data = file.data.id;
                    connections.query('INSERT INTO mobile (proimage) VALUES (?)', data, (err, result) => {
                        if (err) {
                            console.log("error to upload into database", err)
                        } else {
                            console.log("successfully upload into database ", result)
                        }
                    })
                }
            }


        )

    })
})









app.get('/getapi', (req, resp) => {
    drive.files.get(
        {
            fileId: uploadfileids,
            fields: 'webViewLink', // This specifies that we want the web link to the file
        },
        (err, response) => {
            if (err) {
                console.error('Error retrieving shareable link:', err);
                return;
            }

            var shareableLink = response.data.webViewLink;
            console.log('Shareable link:', shareableLink);
        }
    );
})
app.set('port', (process.env.PORT || 4000));
app.listen(app.get('port'), function () {
    console.log('Server started on port ' + app.get('port'));
});