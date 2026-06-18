const express = require("express");
const router = express.Router();

const calculateCarbon =
require("../utils/carbonCalculator");

router.post("/calculate",
(req,res)=>{

 const total =
 calculateCarbon(req.body);

 res.json({
   carbonFootprint: total
 });

});

module.exports = router;