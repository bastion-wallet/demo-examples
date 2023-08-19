import { ethers, Contract } from "ethers";
import { Bastion } from "./sdk/src/index";
const dotenv = require("dotenv");
dotenv.config();

async function main() {
	const bastion = new Bastion();
	const { bastionConnect } = bastion;

	const config = {
		privateKey: process.env.PRIVATE_KEY || "",
		rpcUrl: process.env.RPC_URL || "",
		chainId: 421613, //arb-goerli
		noSponsorship: true,
	};

	const rpcProvider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
	await bastionConnect.init(rpcProvider, config);

	const contractAddress = "0xEAC57C1413A2308cd03eF3CEa5c9224487825341";
	const contractABI = ["function safeMint(address to) public"];
	const nftContract = new ethers.Contract(contractAddress, contractABI, bastionConnect);

	const address = await bastionConnect.getAddress();
	const res = await nftContract.safeMint(address);
}

main();

