/* 

   This file tests the setter functions of smart contracts

*/

const { ethers } = require("hardhat")
const { assert } = require("chai")
require("dotenv").config()

describe("#### TEST SUITE #### Setters of 'SubscriptionService.sol' #### TEST SUITE ####\n", () => {

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
    it("Should be able to edit name of the subscription service \n", async function() {
        //change the name on the contract
        await deployedContract.setSubscriptionName("New_Awesome_Name")
        const currentValue = await deployedContract.getSubscriptionName()
        const expectedValue = "New_Awesome_Name"

        assert.isNotTrue(currentValue == "test1234")
        assert.equal(currentValue, expectedValue)

    })

    // test 2
    it("Should be able to set the price of the subscription service \n", async function() {

        await deployedContract.setPrice(3)

        const currentValue = await deployedContract.getSubscriptionPrice()
        const expectedValue = "3"

        assert.isNotTrue(currentValue.toString() == "1")
        assert.equal(currentValue.toString(), expectedValue)
    })

    // test 3
    it("Should throw an error when passing parameter of incorrect type to setter function", async function() {

        let isError = false;

        try {
            await deployedContract.setPrice("NANANANANAN")
        } catch(e) {
            //console.log(`Error message: \n  ${e.toString().substring(0, 200)}...  `)
            isError = true;
        }

        assert.isTrue(isError)

    })

})