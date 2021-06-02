
import algeria_citiesCtrl from "../controllers/algeria_cities.controller";

var router = require("express").Router();
router.get("/wilaya",algeria_citiesCtrl.getWilaya);
router.get("/wilaya/:wilaya/commune",algeria_citiesCtrl.getCommune);
export default router;


