import { ethers, Contract } from "ethers";
import { Bastion } from "./sdk/src/index";
import { ERC721_ABI } from "./utils/ERC721_ABI";
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
	const toAddress = "0x841056F279582d1dfD586c3C77e7821821B5B510";
	const fromAddress = await bastionConnect.getAddress();

	//This contract is deployed on arb-goerli
	const contractAddress = "0xEAC57C1413A2308cd03eF3CEa5c9224487825341";
	const erc721Contract = new ethers.Contract(contractAddress, ERC721_ABI, bastionConnect);

	const transfer1 = {
		to: contractAddress,
		value: 0,
		data: erc721Contract.interface.encodeFunctionData("transferFrom", [fromAddress, toAddress, 46]),
	};

	const transfer2 = {
		to: contractAddress,
		value: 0,
		data: erc721Contract.interface.encodeFunctionData("transferFrom", [fromAddress, toAddress, 47]),
	};

	const transactionArray = [transfer1, transfer2];
	const res = await bastionConnect.executeBatch(transactionArray);
}

main();

