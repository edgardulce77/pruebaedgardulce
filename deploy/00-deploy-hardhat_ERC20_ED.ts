import { DeployFunction, DeployResult } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import verify from "../helper-functions";

const deploy_hardhat_ERC20_ED: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  //const currentTime: number = Math.floor(Date.now() / 1000);
  //const unlockTime: number = currentTime + 60;

  const args: any[] = [
    deployer, // _unlockTime (1 minute)
  ];

  log("------------------------------------");
  log("Deploying deploy_hardhat_ERC20_ED\n");

  const lock: DeployResult = await deploy("hardhat_ERC20_ED", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });

  /*if (!developmentChains.includes(network.name)) {
    await verify(lock.address, args);
  }*/
};

export default deploy_hardhat_ERC20_ED;