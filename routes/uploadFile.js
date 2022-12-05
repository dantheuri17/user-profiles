const express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const app = express();

const Image = require('../models/Image');
var router = express.Router();

// script.js
const form = document.getElementById("uploadForm")

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById("name");
    const files = document.getElementById("files");
    const formData = new FormData();
    formData.append("name", name.value);
    for(let i =0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
    }
    fetch("http://localhost:3000/upload_files", {
        method: 'POST',
        body: formData
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
}



module.exports = router