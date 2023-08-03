/* 

   This file tests the payable functions of smart contracts

*/

const { ethers } = require("hardhat")
const { assert } = require("chai")
require("dotenv").config()

describe("#### TEST SUITE #### Payable functions of 'SubscriptionService.sol' #### TEST SUITE ####\n", () => {

    // address of the deployer of the contract
    const owner = process.env.OWNER_ADDRESS;

    let contractFactory;
    let deployedContract;

    // What happens before each test
    beforeEach(async function () {
        // get contractouto
        contractFactory = await ethers.getContractFactory("SubscriptionService")
        // deploy contract
        deployedContract = await contractFactory.deploy("test1234", ethers.utils.parseEther("1"))
    })

    // test 1
    it("Should be able to receive payments when ETH sent equals the price of subscription \n", async function() {
        // first see the initial balance
        const initialBalance = await deployedContract.getCurrentBalance()
        //console.log(`Initial balance: ${initialBalance}`)

        // make transaction
        await deployedContract.fund("03/05/2023", { value: ethers.utils.parseEther("1") })
        const currentValue = await deployedContract.getCurrentBalance()
        //console.log(`Balance after funding: ${currentValue / 10 ** 18}`)

        // The contract stores Eth as BigInt, It'll add eighteen zeroes to the number of eth
        const expectedValue = 1 * 10 ** 18

        assert.equal(currentValue.toString(), expectedValue.toString())
    })

    // test 2
    it("Should return an error when value of Eth sent is lower than the price of the subscription \n", async function() {

        let isError = false;

        try {
            await deployedContract.fund("03/05/2023", { value: ethers.utils.parseEther("0.5") })
        } catch(e) {
            //console.log(`Error message: \n  ${e.toString().substring(0, 200)}...  `)
            isError = true;
        }

        assert.isTrue(isError)
    })

    // test 3
    it("Should be able to withdraw Eth \n", async function() {
        const initialBalance = await deployedContract.getCurrentBalance()
        //console.log(`Initial balance: ${initialBalance}`)

        // make transaction
        await deployedContract.fund("03/05/2023", { value: ethers.utils.parseEther("1") })
        const afterFunding = await deployedContract.getCurrentBalance()
        //console.log(`Balance after funding: ${afterFunding / 10 ** 18}`)

        // withdraw funds from contract
        await deployedContract.withdraw()
        const currentValue = await deployedContract.getCurrentBalance()
        //console.log(`Balance after withdraw: ${currentValue / 10 ** 18}`)

        // The contract stores Eth as BigInt, It'll add eighteen zeroes to the number of eth
        const expectedValue = 0 * 10 ** 18

        assert.equal(currentValue.toString(), expectedValue.toString())
    })
})