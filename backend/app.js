import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

const PORT = 3456;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/MulterPractices")
    .then(() => console.log("DB Connected Successfully..."))

const userSchema = new mongoose.Schema({
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    img : {
        type : String,
    }
})

const userModel = mongoose.model("Multer", userSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));
app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

app.post("/post", upload.single("avatar"), async (req, res) => {
    try{
        const url = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
        req.body = ({...req.body, img : url});

        const user = await userModel.create(req.body);

        if(user){
            res.status(201).send({
                statusCode : 201,
                msg : "User Added",
                user
            })
        }
        else{
            res.status(201).send({
                statusCode : 201,
                msg : "User Added",
                user
            })
        }
    }
    catch(err){
        res.status(500).send({
            statusCode : 500,
            err : "Internal Server Error"
        })
    }
})

app.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;

        const userEmail = await userModel.findOne({email})

        if(userEmail){
            if(password === userEmail.password){
                res.status(200).send({
                    statusCode : 200,
                    msg : "user logged in successfully",
                    user : userEmail
                })
            }
            else{
                res.status(203).send({
                    statusCode : 203,
                    msg : "invalid email and password"
                })
            }
        }
        else{
            res.status(400).send({
                statusCode : 400,
                msg : "User Not Found"
            })
        }
    }
    catch(err){
        res.status(500).send({
            statusCode : 500,
            err : "Internal Server Error"
        })
    }
})

app.get("/get/:id", async (req, res) => {
    try{
        const user = await userModel.findById({_id : req.params.id});
        if(user){
            res.send(user);
        }
        else{
            res.send("something went wrong")
        }
    }
    catch(err){
        res.status(500).send({
            statusCode : 500,
            err : "Internal Server Error"
        })
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
