
const request=require('request');

const forecast=(latitude,longitude,callback)=>{

    const url='https://api.darksky.net/forecast/77158e1a65bbcddce3e1f7550c882dd6/'+latitude+','+longitude+'';

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined);
        }else if(body.error){
            callback(body.error,undefined);
        }else{
            const forecastData=body.daily.data[0].summary+  'High temparature :  '+body.daily.data[0].temperatureHigh+' degrees and Low temparature : '+body.daily.data[0].temperatureLow+ ' degrees. There is a '+ body.daily.data[0].precipProbability+' % Chance of rain.'
            callback(undefined,{
                summary            : body.daily.data[0].summary,
                temperature        : body.currently.temperature,
                precipProbability  : body.currently.precipProbability,
                forecastData
            })
        }
    });
}

module.exports=forecast;