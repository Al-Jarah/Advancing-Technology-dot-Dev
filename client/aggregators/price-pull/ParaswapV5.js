const { default: axios } = require("axios");

// make props or state some shit
srcToken = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
destToken = 0x6b175474e89094c44da98b954eedeac495271d0f;
amount = 1000000000000000000;
srcDecimals = 18;
destDecimals = 18;
side = 'SELL';
network = 1;

function ParaswapRate( srcToken, destToken, amount, srcDecimals, destDecimals, side, network ) {    
    axios.get(
        'https://apiv5.paraswap.io/prices/?' + 
        'srcToken=' + `${srcToken}` + 
        '&' + 
        'destToken=' + `${destToken}` + 
        '&' + 
        'amount=' + `${amount}` + 
        '&' + 
        'srcDecimals=' + `${srcDecimals}` + 
        '&' + 
        'destDecimals=' + `${destDecimals}` + 
        '&' + 
        'side=' + `${side}` + 
        '&' + 
        'network=' + `${network}`
    )
        .then(function (response) {
            console.log((response.data.priceRoute.destAmount) / 1000000000000000000)
            console.log(response.data.priceRoute.gasCostUSD)
        })


    }





