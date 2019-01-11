var payload = '036700ff056700ff'
console.log(payload.slice(2, 4))
console.log(payload.slice(4,5))
console.log(payload.slice(5,8))
if(payload) {
    if( payload.slice(2, 4) === "67" ) {
      if(payload.slice(4,5) === '0') {
        var Temperature = (parseInt(payload.slice(5,8), 16))/10
        console.log(Temperature)
      } else if(payload.slice(4,5) === 'f') {
        var Temperature = -((parseInt(payload.slice(5,8), 16))/10)
        console.log(Temperature)
      }
    } else {
      console.log("It is not a temperature")
    }
    if( payload.slice(2, 4) === "67" ) {
        if(payload.slice(4,5) === '0') {
          var Humidity = (parseInt(payload.slice(5,8), 16))/10
          console.log(Humidity)
        } else if(payload.slice(4,5) === 'f') {
          var Humidity = -((parseInt(payload.slice(5,8), 16))/10)
          console.log(Humidity)
        }
      } else {
        console.log("It is not a humidity")
      }
  }