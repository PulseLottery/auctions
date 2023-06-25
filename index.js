// MetaMask setup
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = '0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3'; // Replace with your actual contract address
const auctionContractABI = [
  // ABI definicje funkcji kontraktu aukcyjnego...
];
const auctionContract = new ethers.Contract(contractAddress, auctionContractABI, signer);

async function updateContractInfo() {
  try {
    const owner = await auctionContract.owner();
    const price = await auctionContract.price();
    const startTime = await auctionContract.startTime();
    const lastBidder = await auctionContract.lastBidder();
    const auctionActive = await auctionContract.auctionActive();
    const remainingPackets = await auctionContract.remainingPackets();
    const timeRemaining = await auctionContract.getTimeRemaining();

    document.getElementById("owner").textContent = owner;
    document.getElementById("price").textContent = price.toString();
    document.getElementById("startTime").textContent = new Date(startTime * 1000).toLocaleString();
    document.getElementById("lastBidder").textContent = lastBidder;
    document.getElementById("auctionActive").textContent = auctionActive.toString();
    document.getElementById("remainingPackets").textContent = remainingPackets.toString();
    document.getElementById("timeRemaining").textContent = timeRemaining.toString();
  } catch (error) {
    console.error("Error updating contract info:", error);
  }
}

async function placeBid() {
  try {
    await auctionContract.placeBid({ value: ethers.utils.parseEther('1.0') });
    console.log("Bid placed successfully");
  } catch (error) {
    console.error("Error placing bid:", error);
  }
}

async function endAuction() {
  try {
    await auctionContract.endAuction();
    console.log("Auction ended successfully");
  } catch (error) {
    console.error("Error ending auction:", error);
  }
}

document.getElementById("placeBidButton").addEventListener("click", placeBid);
document.getElementById("endAuctionButton").addEventListener("click", endAuction);

setInterval(updateContractInfo, 2000); // Update contract info every 2 seconds
