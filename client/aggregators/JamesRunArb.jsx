  require("dotenv").config();
const Web3 = require("web3");
const { BigNumber } = require('ethers'); //dont know whether to use Web3.utils.toBN or this import BigNumber from 'bignumber.js'; or what i have there
// ParaSwap imports
const { ParaSwap } = require('paraswap');
const { default: axios } = require("axios");
const paraSwap = new ParaSwap();
//const abis = require("./abis");
//const { mainnet: addresses } = require("./addresses");


const yourInfuraKey = 'fef48fb813584134b111cbe42a9ec7e0';
const webb3 = new Web3(`https://mainnet.infura.io/v3/${yourInfuraKey}`);

// eslint-disable-next-line max-len
const OffChainOracleAbi = '[{"inputs":[{"internalType":"contract MultiWrapper","name":"_multiWrapper","type":"address"},{"internalType":"contract IOracle[]","name":"existingOracles","type":"address[]"},{"internalType":"enum OffchainOracle.OracleType[]","name":"oracleTypes","type":"uint8[]"},{"internalType":"contract IERC20[]","name":"existingConnectors","type":"address[]"},{"internalType":"contract IERC20","name":"wBase","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"ConnectorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"ConnectorRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract MultiWrapper","name":"multiWrapper","type":"address"}],"name":"MultiWrapperUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IOracle","name":"oracle","type":"address"},{"indexed":false,"internalType":"enum OffchainOracle.OracleType","name":"oracleType","type":"uint8"}],"name":"OracleAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IOracle","name":"oracle","type":"address"},{"indexed":false,"internalType":"enum OffchainOracle.OracleType","name":"oracleType","type":"uint8"}],"name":"OracleRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"addConnector","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IOracle","name":"oracle","type":"address"},{"internalType":"enum OffchainOracle.OracleType","name":"oracleKind","type":"uint8"}],"name":"addOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"connectors","outputs":[{"internalType":"contract IERC20[]","name":"allConnectors","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"contract IERC20","name":"dstToken","type":"address"},{"internalType":"bool","name":"useWrappers","type":"bool"}],"name":"getRate","outputs":[{"internalType":"uint256","name":"weightedRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"bool","name":"useSrcWrappers","type":"bool"}],"name":"getRateToEth","outputs":[{"internalType":"uint256","name":"weightedRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"multiWrapper","outputs":[{"internalType":"contract MultiWrapper","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracles","outputs":[{"internalType":"contract IOracle[]","name":"allOracles","type":"address[]"},{"internalType":"enum OffchainOracle.OracleType[]","name":"oracleTypes","type":"uint8[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"removeConnector","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IOracle","name":"oracle","type":"address"},{"internalType":"enum OffchainOracle.OracleType","name":"oracleKind","type":"uint8"}],"name":"removeOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract MultiWrapper","name":"_multiWrapper","type":"address"}],"name":"setMultiWrapper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
const offChainOracleAddress = '0x07D91f5fb9Bf7798734C3f606dB065549F6893bb';
const offChainOracleContract = new webb3.eth.Contract(JSON.parse(OffChainOracleAbi), offChainOracleAddress);

const token = {
    address1: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
    decimals: 18,
};

  // 1INCH
  
offChainOracleContract.methods.getRateToEth(
    token.address1, // source token
    true, // use source wrappers
).call()
    .then((rate) => {
        const numerator = BigNumber.from(10).pow(token.decimals);
        const denominator = BigNumber.from(10).pow(18); // eth decimals
        const price = BigNumber.from(rate).mul(numerator).div(denominator);
        var daiEthSwap = (((price*20000)));
        console.log(daiEthSwap.toString() + " " + "ETH for 20000 DAI");
       
        
        const srcAmount = daiEthSwap;
        axios.get('https://apiv5.paraswap.io/prices/?srcToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&destToken=0x6b175474e89094c44da98b954eedeac495271d0f&amount=' + `${srcAmount}` +'&srcDecimals=18&destDecimals=18&side=SELL&network=1')
        .then(function (response) {
            console.log((response.data.priceRoute.destAmount) / 1000000000000000000)
            console.log(response.data.priceRoute.gasCostUSD)
        })
    })

          //edit this below
   /* if (daiFromKyber.gt(AMOUNT_DAI_WEI)) {
      const tx = flashloan.methods.initiateFlashloan(
        addresses.dydx.solo,
        addresses.tokens.dai,
        AMOUNT_DAI_WEI,
        DIRECTION.UNISWAP_TO_KYBER
      );
      const [gasPrice, gasCost] = await Promise.all([
        web3.eth.getGasPrice(),
        tx.estimateGas({ from: admin }),
      ]);
      const txCost = web3.utils
        .toBN(gasCost)
        .mul(web3.utils.toBN(gasPrice))
        .mul(ethPrice);
      const profit = daiFromKyber.sub(AMOUNT_DAI_WEI).sub(txCost);

    if (profit > 0) {
      console.log("Arb opportunity found Uniswap -> Kyber!");
      console.log(`Expected profit: ${web3.utils.fromWei(profit)} Dai`);
      const data = tx.encodeABI();
      const txData = {
        from: admin,
        to: flashloan.options.address,
        data,
        gas: gasCost,
        gasPrice,
      };
      const receipt = await web3.eth.sendTransaction(txData);
      console.log(`Transaction hash: ${receipt.transactionHash}`);
    }
  }


  if (daiFromUniswap.gt(AMOUNT_DAI_WEI)) {
    const tx = flashloan.methods.initiateFlashloan(
      addresses.dydx.solo,
      addresses.tokens.dai,
      AMOUNT_DAI_WEI,
      DIRECTION.KYBER_TO_UNISWAP
    );
    const [gasPrice, gasCost] = await Promise.all([
      web3.eth.getGasPrice(),
      tx.estimateGas({ from: admin }),
    ]);

    const txCost = web3.utils
      .toBN(gasCost)
      .mul(web3.utils.toBN(gasPrice))
      .mul(ethPrice);
    const profit = daiFromUniswap.sub(AMOUNT_DAI_WEI).sub(txCost);

    if (profit > 0) {
      console.log("Arb opportunity found Kyber -> Uniswap!");
      console.log(`Expected profit: ${web3.utils.fromWei(profit)} Dai`);
      const data = tx.encodeABI();
      const txData = {
        from: admin,
        to: flashloan.options.address,
        data,
        gas: gasCost,
        gasPrice,
      };
      const receipt = await web3.eth.sendTransaction(txData);
      console.log(`Transaction hash: ${receipt.transactionHash}`);
    }
  }*/














           /* axios.get('https://apiv5.paraswap.io/prices/?srcToken=0x6b175474e89094c44da98b954eedeac495271d0f&destToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&amount=20000&srcDecimals=18&destDecimals=18&side=SELL&network=1')
            .then(function (response) {
                paraswapEth = response.data.priceRoute.destAmount
                console.log(response.data.priceRoute.gasCostUSD)

                offChainOracleContract.methods.getRateToEth(
                    token.address1, // source token
                    true, // use source wrappers
                ).call()
                    .then((rate) => {
                        const numerator = BigNumber.from(10).pow(token.decimals);
                        const denominator = BigNumber.from(10).pow(18); // eth decimals
                        const price = BigNumber.from(rate).mul(numerator).div(denominator);
                        var daiEthSwap = (((price*20000)));
                        console.log(daiEthSwap.toString() + " " + "ETH for 20000 DAI");
                       
                        
                        const srcAmount = daiEthSwap;
            })
        })*/
    // PARASWAP

const srcAmount = 1000000000000000000;
axios.get('https://apiv5.paraswap.io/prices/?srcToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&destToken=0x6b175474e89094c44da98b954eedeac495271d0f&amount=' + `${srcAmount}` +'&srcDecimals=18&destDecimals=18&side=SELL&network=1')
  .then(function (response) {
    //console.log(response);
    // console.log(response/*.data.priceRoute.destAmount*/)
  })

























































/*const magicNumber = (endDaiParaSwap - 20000)

if (magicNumber >= 500) {

}*/

   // console.log(daiEthSwap + " " + "ETH for 20000 DAI"); doesnt work outside the method im just retarted ill get this later

//this is the paraswap npm thing fucked up below need to fix
/*const tokens = await paraSwap.getTokens();
const srcToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'; // ETH
const destToken = '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359'; // DAI
const srcAmount = daiEthSwap; //The source amount multiplied by its decimals: 10 ** 18 here

const priceRoute: OptimalRates = await paraSwap.getRate(
  srcToken,
  destToken,
  srcAmount,
);


*/




    /*const web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.INFURA_URL)
  );
  const { address: admin } = web3.eth.accounts.wallet.add(
    process.env.PRIVATE_KEY
  );
  
  const kyber = new web3.eth.Contract(
    abis.kyber.kyberNetworkProxy,
    addresses.kyber.kyberNetworkProxy
  );
  
  const ONE_WEI = web3.utils.toBN(web3.utils.toWei("1"));
  const AMOUNT_DAI_WEI = web3.utils.toBN(web3.utils.toWei("20000"));
  const DIRECTION = {
    KYBER_TO_UNISWAP: 0,
    UNISWAP_TO_KYBER: 1,
  };
  
  const init = async () => {
    const networkId = await web3.eth.net.getId();
    const flashloan = new web3.eth.Contract(
      Flashloan.abi,
      Flashloan.networks[networkId].address
    );
  
    let ethPrice;
    const updateEthPrice = async () => {
      const results = await kyber.methods
        .getExpectedRate(
          "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          addresses.tokens.dai,
          1
        )
        .call();
      ethPrice = web3.utils
        .toBN("1")
        .mul(web3.utils.toBN(results.expectedRate))
        .div(ONE_WEI);
    };
    await updateEthPrice();
    setInterval(updateEthPrice, 15000);
  
    web3.eth
      .subscribe("newBlockHeaders")
      .on("data", async (block) => {
        console.log(`New block received. Block # ${block.number}`);
  
        const [dai, weth] = await Promise.all(
          [addresses.tokens.dai, addresses.tokens.weth].map((tokenAddress) =>
            Token.fetchData(ChainId.MAINNET, tokenAddress)
          )
        );
        const daiWeth = await Pair.fetchData(dai, weth);
  
        const amountsEth = await Promise.all([
          kyber.methods
            .getExpectedRate(
              addresses.tokens.dai,
              "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
              AMOUNT_DAI_WEI
            )
            .call(),
          daiWeth.getOutputAmount(new TokenAmount(dai, AMOUNT_DAI_WEI)),
        ]);
        const ethFromKyber = AMOUNT_DAI_WEI.mul(
          web3.utils.toBN(amountsEth[0].expectedRate)
        ).div(ONE_WEI);
        const ethFromUniswap = web3.utils.toBN(amountsEth[1][0].raw.toString());
  
        const amountsDai = await Promise.all([
          kyber.methods
            .getExpectedRate(
              "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
              addresses.tokens.dai,
              ethFromUniswap.toString()
            )
            .call(),
          daiWeth.getOutputAmount(new TokenAmount(weth, ethFromKyber.toString())),
        ]);
        const daiFromKyber = ethFromUniswap
          .mul(web3.utils.toBN(amountsDai[0].expectedRate))
          .div(ONE_WEI);
        const daiFromUniswap = web3.utils.toBN(amountsDai[1][0].raw.toString());
  
        console.log(
          `Kyber -> Uniswap. Dai input / output: ${web3.utils.fromWei(
            AMOUNT_DAI_WEI.toString()
          )} / ${web3.utils.fromWei(daiFromUniswap.toString())}`
        );
        console.log(
          `Uniswap -> Kyber. Dai input / output: ${web3.utils.fromWei(
            AMOUNT_DAI_WEI.toString()
          )} / ${web3.utils.fromWei(daiFromKyber.toString())}`
        );
  
        if (daiFromUniswap.gt(AMOUNT_DAI_WEI)) {
          const tx = flashloan.methods.initiateFlashloan(
            addresses.dydx.solo,
            addresses.tokens.dai,
            AMOUNT_DAI_WEI,
            DIRECTION.KYBER_TO_UNISWAP
          );
          const [gasPrice, gasCost] = await Promise.all([
            web3.eth.getGasPrice(),
            tx.estimateGas({ from: admin }),
          ]);
  
          const txCost = web3.utils
            .toBN(gasCost)
            .mul(web3.utils.toBN(gasPrice))
            .mul(ethPrice);
          const profit = daiFromUniswap.sub(AMOUNT_DAI_WEI).sub(txCost);
  
          if (profit > 0) {
            console.log("Arb opportunity found Kyber -> Uniswap!");
            console.log(`Expected profit: ${web3.utils.fromWei(profit)} Dai`);
            const data = tx.encodeABI();
            const txData = {
              from: admin,
              to: flashloan.options.address,
              data,
              gas: gasCost,
              gasPrice,
            };
            const receipt = await web3.eth.sendTransaction(txData);
            console.log(`Transaction hash: ${receipt.transactionHash}`);
          }
        }
  
        if (daiFromKyber.gt(AMOUNT_DAI_WEI)) {
          const tx = flashloan.methods.initiateFlashloan(
            addresses.dydx.solo,
            addresses.tokens.dai,
            AMOUNT_DAI_WEI,
            DIRECTION.UNISWAP_TO_KYBER
          );
          const [gasPrice, gasCost] = await Promise.all([
            web3.eth.getGasPrice(),
            tx.estimateGas({ from: admin }),
          ]);
          const txCost = web3.utils
            .toBN(gasCost)
            .mul(web3.utils.toBN(gasPrice))
            .mul(ethPrice);
          const profit = daiFromKyber.sub(AMOUNT_DAI_WEI).sub(txCost);
  
          if (profit > 0) {
            console.log("Arb opportunity found Uniswap -> Kyber!");
            console.log(`Expected profit: ${web3.utils.fromWei(profit)} Dai`);
            const data = tx.encodeABI();
            const txData = {
              from: admin,
              to: flashloan.options.address,
              data,
              gas: gasCost,
              gasPrice,
            };
            const receipt = await web3.eth.sendTransaction(txData);
            console.log(`Transaction hash: ${receipt.transactionHash}`);
          }
        }
      })
    .on("error", (error) => {
        console.log(error);
    });
};
init();*/
