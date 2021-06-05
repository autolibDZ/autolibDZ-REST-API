const db = require("../models");
const Algeria_Cities = db.algeria_cities;
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const getWilaya = async(req,res)=>{
    try {

        const data = await Algeria_Cities.findAll({ attributes: [[Algeria_Cities.sequelize.fn('DISTINCT', Algeria_Cities.sequelize.col('wilaya_name_ascii')), 'wilaya']] }); 
    
        if (data.length != 0 && data != null) {
    
          res.send(data);
    
    
        } else {
          res.status(404).send({
    
            message: "No wilaya found!"
    
          })
    
        }
    
    
      } catch (err) {
        res.status(500).send({
    
          error: err.message || "Some error occurred while getting list of Wilaya."
    
        });
    
    
      }
    
};
const getCommune = async (req, res) => {
    try {
  
      let wilaya = req.params.wilaya
  
      if (wilaya == "all") {
  
        const data = await Algeria_Cities.findAll({ attributes: [[Algeria_Cities.sequelize.fn('DISTINCT', Algeria_Cities.sequelize.col('commune_name_ascii')), 'commune']] }); 
  
        if (data.length != 0) {
  
          res.send(data);
  
  
        } else {
          res.status(404).send({
  
            message: "No Commune found!"
  
          })
  
        }
  
      } else {
  
        const data = await Algeria_Cities.findAll({ attributes: [[Algeria_Cities.sequelize.fn('DISTINCT', Algeria_Cities.sequelize.col('commune_name_ascii')), 'commune']], where: { wilaya_name_ascii: wilaya} });
  
        if (data.length != 0) {
  
          res.send(data);
  
  
        } else {
  
          res.status(404).send({
  
            message: "No Commune found for wilaya :" + wilaya
  
  
          })
  
        }
  
      }
  
  
    } catch (err) {
      res.status(500).send({
  
        error: err.message || "Some error occurred while getting list of Communes"
  
      });
    }
  };

export default {
 getWilaya, 
 getCommune
}
