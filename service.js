let express = require('express');
let router = express.Router();

//"/api/test"
router.get("/test", function(req, res){
    res.json({tt:"34"});
});

//"/api/:"
router.get("/:date", function(req, res){
    console.log(`Date Param  ${req.params.date}`);
    let unix;
    let paramData = req.params.date;
    let pattern = /\D/g;//To check if there is any non-digit.
    let result = paramData.match(pattern);
    if(result == null){
        //param is all digits(number in js)
        paramData = parseInt(paramData);
        unix = paramData;
    }
    let utcDate = new Date(paramData);
    // console.log(`Date : ${utcDate}  |  Instance : ${utcDate instanceof Date}`);
    if(utcDate instanceof Date == false || !utcDate.isValid()) {
        res.json({ error : "Invalid Date" });
    }else{
        if(unix == null){
            console
            unix =  utcDate.getTime();
        }
        console.log({"unix":unix,"utc":utcDate.toString()});
        res.json({"unix":unix,"utc":utcDate.toUTCString()});
    }
});

router.get("/", function(req, res){
    let unix = Date.now();
    let utcDate =  new Date(unix);
    res.json({"unix":unix,"utc":utcDate.toUTCString()});
});

Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
}; 

module.exports = router;