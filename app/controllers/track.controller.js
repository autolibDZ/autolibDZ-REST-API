const db = require('../models');
const Vehicule = db.vehicules;


// Your AccoundId from dashboard.hypertrack.com/setup page
let accountId = '_dQiNWGnzEtTePzKlHpXwvyRVWw'
// Your SecretKey from dashboard.hypertrack.com/setup page
    let secretKey = 'rawnP9xVOk_NQ1Kqj4ZyWcWcKZuXBGjqH-wLZtO9o1RaGYClo1rCqQ'
    const hypertrack = require('hypertrack')(accountId, secretKey);

const startTracking = async (req,res)=>{

    const id_vehicule = req.params.id_vehicule;
    let id_device;
    console.log('start')
    await Vehicule.findOne({where: {numChassis: id_vehicule}})
    .then(vehicule => {
        if (!vehicule){res.status(404).send({ message: 'Vehicule non existant' });}
        else {
            if (!vehicule.id){res.status(404).send({ message: 'Ordinateur de bord du vehicule non existant' });}
            else{
            id_device= vehicule.id;}
        }
    })
    .catch(error => {
        console.log(error)
    })
    if (id_device) {
    await hypertrack.devices.startTracking(id_device).then((data) => {
        var message = data.message
        console.log('tracking')
        res.send(message)

      }).catch(error => {
        console.log("Hypertrack error: "+ error)
      })}

};

const getPosition = async function (req,res) {
    const id_vehicule = req.params.id_vehicule;
    let id_device;
    await Vehicule.findOne({where: {numChassis: id_vehicule}})
    .then(vehicule => {
        if (!vehicule){res.status(404).send({ message: 'Vehicule non existant' });}
        else {
            if (!vehicule.id){res.status(404).send({ message: 'Ordinateur de bord du vehicule non existant' });}
            else{
            id_device= vehicule.id;}
        }
    })
    .catch(error => {
        console.log(error)
    })
    if (id_device) {
    await hypertrack.devices.get(id_device).then(device => {
        var coor = device.location.geometry.coordinates
        console.log('sending location')
        res.send(device.location)
      }).catch(error => {
        console.log("Hypertrack error: "+error)
      })}
}


const stopTracking = async function (req, res) {
    const id_vehicule = req.params.id_vehicule;
    let id_device;
    await Vehicule.findOne({where: {numChassis: id_vehicule}})
    .then(vehicule => {
        if (!vehicule){res.status(404).send({ message: 'Vehicule non existant' });}
        else {
            if (!vehicule.id){res.status(404).send({ message: 'Ordinateur de bord du vehicule non existant' });}
            else{
            id_device= vehicule.id;}
        }
    })
    .catch(error => {
        console.log(error)
    })
    if (id_device) {
     await hypertrack.devices.stopTracking("165C663A-F158-3015-8EE2-88F6490EA372").then((data) => {
          var message = data.message
          console.log('stopped tracking')
          res.send(message);
        }).catch(error => {
            console.log("Hypertrack error: "+error)
        })}
  
  };

  export default {
    startTracking,
    getPosition,
    stopTracking
   }
   
