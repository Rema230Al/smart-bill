const tesseract = require("tesseract.js");

async function extractText(imagepath){

    //desturcturing
    const {data:{text}}= await tesseract.recognize(imagepath,"eng");

    return text;
}

module.exports = { extractText };