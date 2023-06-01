const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const quationRoute = require("./routes/quations");
const answerRoute = require("./routes/answer");
const fileUpload = require("express-fileupload");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();
//mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifieldTopology: true},()=>{
//console.log("connected to mongodb")
//});
mongoose.connect(process.env.MONGO_URL, () =>
    console.log("database connected")
);

//app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());

app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

// Create multer instance
const upload = multer({ storage });

// Define schema for uploaded files
const fileSchema = new mongoose.Schema({
    name: String,
    path: String,
});

// Define model for uploaded files
const File = mongoose.model("File", fileSchema);

// Define route for file upload
app.post("/upload", upload.single("image"), async(req, res) => {
    try {
        const { originalname, path } = req.file;
        const file = new File({
            name: originalname,
            path: path,
        });
        await file.save();
        res.send(file);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/quations", quationRoute);
app.use("/api/answers", answerRoute);
app.get("/", (req, res) => {
    res.send("GET Request Called");
});
app.listen(process.env.PORT, () => {
    console.log("backend server is running on port 3000");
});