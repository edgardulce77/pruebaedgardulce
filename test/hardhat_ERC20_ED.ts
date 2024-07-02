import { expect } from "chai";
import { ethers } from "hardhat";

describe("hardhat_ERC20_ED", function () {


  it("Test contract", async function () {
    const ContractFactory = await ethers.getContractFactory("hardhat_ERC20_ED");

    const initialOwner = (await ethers.getSigners())[0].address;

    const instance = await ContractFactory.deploy(initialOwner);
    await instance.waitForDeployment();

    expect(await instance.name()).to.equal("hardhat_ERC20_ED");
  });


  it("Deploy transaction token contract", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const hardhat_ERC20_ED = await ethers.getContractFactory("hardhat_ERC20_ED");
    const prueba = await hardhat_ERC20_ED.deploy(owner.address);

    // Transaction confirmation
    await prueba.deploymentTransaction();

    const mintAmount = ethers.parseUnits("1000", 18); 
    await prueba.mint(addr1.address, mintAmount);
    const balance = await prueba.balanceOf(addr1.address);
    expect(balance).to.equal(mintAmount);
    
  });

});