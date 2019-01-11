var VisitorData = require("../models/visitorData");
var BeaconData = require('../models/beaconData')
var file = require('../utils/fileUtils');

var visitorDataController = {};

visitorDataController.putSanam = function(req, res) {
    let data = {
        dateTime: req.body.beacon.dateTime.toString(),
        status: req.body.beacon.status.toString()
    }
    
    var beaconData = new BeaconData(data);
}

visitorDataController.getSanam = async function(req, res) {
    let hours = parseInt(req.query.Hours);
    let numArr = Math.ceil(hours/24);

    VisitorData.find({}).sort({day: -1}).limit(numArr).exec(async function(err, result) {
        if(err) {
            console.log(err)
            return;
        }

        if(result.length == 0) {
            let data = await file.extractData();
            
            data.forEach((item) => {
                let visitorData = new VisitorData(item);
                visitorData.save(function(err, data) {
                    if(err) {
                        console.log(err)
                        return;
                    }
                    console.log('add success', item)
                })
            })
        } else {
            let resultRes = {
                number_of_tourist: []
            };

            let visitorsHour = []

            result.forEach((item) => {
                let visitorsInHour = item.values
                let len = visitorsInHour.length

                for(let i=len-1 ; i>=0 ;i--) {
                    visitorsHour.push(visitorsInHour[i]);
                    hours--;
                    if(hours==0)
                        break;
                }
            })

            for(let j=visitorsHour.length-1 ; j >= 0 ; j--) {
                resultRes.number_of_tourist.push(visitorsHour[j]);
            }

            res.json(resultRes);
        }
    })
}

function fetchBeaconStatus() {
  BeaconData.find({}).exec(function (err, beaconData) {
    console.log(beaconData);
    console.log(isToday(new Date()))
  })
}

function isToday(date) {
  let toDay = new Date();
  console.log(toDay.getDay())
  console.log(toDay.getMonth())
  console.log(toDay.getFullYear())
  return (toDay.getFullYear == date.getFullYear && toDay.getMonth == date.getMonth && toDay.getDay == date.getDay)
}

module.exports = visitorDataController