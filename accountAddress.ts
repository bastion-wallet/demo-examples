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
	};

	const rpcProvider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
	await bastionConnect.init(rpcProvider, config);

	const address = await bastionConnect.getAddress();
	console.log("My Smart Account address => ", address);
}

main();

