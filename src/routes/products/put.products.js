const server = require("express").Router();
const {editProduct, editLikes} = require("../../controllers/products/put.products");
const {Product} = require("../../db")
const fs = require("fs");
const path = require("path");

server.put("/", (req, res, next) => {
  
  const { 
    id, name, description, artist,
    price, bpm, scale, date, oldImage,
    oldAudio, editFiles, editImage,
    editAudio } = req.body;

  var product;

  if (editFiles === "edit") {
    if(editImage === "edit"){
      let url = path.join(__dirname, "../../../uploads/");
      let img = oldImage;
      let imgPath = url + img;
      let aux = [];
          aux.push(imgPath)
      
          for (let i = 0; i < aux.length; i++) {
            console.log("DELET FILES")
            fs.unlinkSync(aux[i])
            console.log("FILE DELETE", aux[i])
          }
  
          const files = req.files;
          const imgToDb = files[0].filename;
  
          product = {
            name: name,
            description: description,
            artist: artist,
            price: price,
            bpm: bpm,
            scale: scale,
            date: date,
            image: imgToDb,
          };
    }
    if(editAudio === "edit"){
      let url = path.join(__dirname, "../../../uploads/");
      let audio = oldAudio;
      let audioPath = url + audio;
      let aux = [];
          aux.push(audioPath)
      
          for (let i = 0; i < aux.length; i++) {
            console.log("DELET FILES")
            fs.unlinkSync(aux[i])
            console.log("FILE DELETE", aux[i])
          }
  
          const files = req.files;
          var audioToDb
          if(editImage === "edit"){
             audioToDb = files[1].filename;
          }else{
             audioToDb = files[0].filename;
          }
  
          product = {
            name: name,
            description: description,
            artist: artist,
            price: price,
            bpm: bpm,
            scale: scale,
            date: date,
            audio: audioToDb,
          };
    }
  }else{

    product = {
      name: name,
      description: description,
      artist: artist,
      price: price,
      bpm: bpm,
      scale: scale,
      date: date,
    };

  }

  return editProduct(product, id).then((product) => {
      res.status(200).json(product);
    }).catch((error) => {
      res.status(400).json(error);
    });
});

server.put("/likes", async (req, res, next) => {
  const {id} = req.body
  return await Product.findByPk(id).then(async (product)=>{
    console.log("PRODUCTTTTTTTO UPDATE", product.dataValues.likes)
    return await Product.update({likes: product.dataValues.likes + 1}, {
      where:{
        id:id
      }
    }).then((product)=>{
      return res.status(2)
    })
  }).catch((error) => {
      return error
    });
});

server.put("/reproductions", async (req, res, next) => {
  const {id} = req.body
  return await Product.findByPk(id).then(async (product)=>{
    return await Product.update({reproductions: product.dataValues.reproductions + 1}, {
      where:{
        id:id
      }
    }).then((product)=>{
      return res.status(200).json(product)
    })
  }).catch((error) => {
      return error
    });
});

module.exports = server;