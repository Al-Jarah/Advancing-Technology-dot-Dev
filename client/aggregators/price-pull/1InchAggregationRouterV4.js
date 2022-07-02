const { default: axios } = require("axios");


// make props or some shit
const swapParams = {
    fromTokenAddress: 0x111111111117dc0aa78b770fa6a738034120c302, // 1INCH
    toTokenAddress: 0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3, // DAI
    amount: 100000000000000000

}
function OneInchRate( fromTokenAddress, toTokenAddress, amount) {    
    axios.get(
        'https://api.1inch.io/v4.0/quote?' + 
        'fromTokenAddress=' + `${srcToken}` + 
        '&' + 
        'toTokenAddress=' + `${destToken}` + 
        '&' + 
        'amount=' + `${amount}`
    )
        .then(function (response) {
            console.log((response.data.priceRoute.destAmount) / 1000000000000000000)
            console.log(response.data.priceRoute.gasCostUSD)
        })


    }

