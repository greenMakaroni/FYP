/* 

    This file tests the intial value of just deployed smart contract 
   Testing getters of the main fields.

*/

const { ethers } = require("hardhat")
const { assert } = require("chai")
require("dotenv").config()

describe("#### TEST SUITE ####  Getters of 'SubscriptionService.sol' #### TEST SUITE #### \n", () => {

    // Define values in the scope of the describe function so that each "it" has access
    const owner = process.env.OWNER_ADDRESS;
    
    let contractFactory;
    let deployedContract;

    // What happens before each test
    beforeEach(async function () {
        // get contractouto
        contractFactory = await ethers.getContractFactory("SubscriptionService")
        // deploy contract
        deployedContract = await contractFactory.deploy("test1234", 1)
    })

    // test 1
    it("Should start with an empty array of subscribers \n", async function() {
        // nameOfSubscribers is defined in a smart contract, it returns the length of subscribers array
        const currentValue = await deployedContract.getNumberOfSubscribers()
        const expectedValue = 0

        //console.log(`Length of an array of subscribers: ${currentValue}`)

        assert.equal(currentValue.toString(), expectedValue.toString())
    })

    // test 2
    it("Should start with name of the subscription field innitiated to 'test1234' \n", async function() {
        const currentValue = await deployedContract.getSubscriptionName()
        const expectedValue = "test1234"

        //console.log(`Current name of smart contract: ${currentValue}`)

        assert.equal(currentValue, expectedValue)
    })

    // test 3
    it("Should be deployed with price of subscription set to 1 \n", async function() {
        const currentValue = await deployedContract.getSubscriptionPrice()
        const expectedValue = "1"

        //console.log(`Subscription price: ${currentValue}`)

        assert.equal(currentValue.toString(), expectedValue)
    })

    // test 4
    it("Asserting the owner of the contract \n", async function() {
        const currentValue = await deployedContract.getOwnerAddress()
        const expectedValue = owner;

        //console.log(`Address of the owner: ${currentValue}`)

        assert.equal(currentValue, expectedValue)
    })
    
    // test 5
    it("Should get the contract's balance, and it should be 0 \n", async function() {
        const currentValue = await deployedContract.getCurrentBalance()
        const expectedValue = 0;

        //console.log(`Initial balance: ${currentValue}`)

        assert.equal(currentValue, expectedValue)
    })

    // test 6
    it("Should fetch expiry date of a subscription service customer \n", async function() {

        // fund contract using owner address
        //console.log("Funding contract...\n")
        await deployedContract.fund("03/05/2023", { value: ethers.utils.parseEther("2") })
        //console.log(`Contract funded. Current balance: ${await deployedContract.getCurrentBalance()}\n`)

        const currentValue = await deployedContract.getExpiryDate(owner)
        const expectedValue = "03/05/2023"
        //console.log("fetched value: ", currentValue)

        assert.equal(currentValue, expectedValue)
    })

    // test 7
    it("Should return nothing when trying to fetch expiry date of non-existing customer", async function() {
        
        const someRandomAddress = "0x94c26cA0bD658Ed132E7e9663276d40aA39ca90d"

        const currentValue = await deployedContract.getExpiryDate(someRandomAddress)
        const expectedValue = "";

        assert.equal(currentValue, expectedValue)
    })

    // test 8
    it("Should throw error while passing parameter that isn't a valid address", async function() { 
    let isError = false;

    try {
        await deployedContract.getExpiryDate(12)
    } catch(e) {
        //console.log(`Error message: \n  ${e.toString().substring(0, 200)}...  `)
        isError = true;
    }

    assert.isTrue(isError)
    })

    // test 9 
    it("Should add customer to subscribers array when contract is funded", async function() {
        await deployedContract.fund("03/05/2023", { value: ethers.utils.parseEther("2") })
        const currentValue = await deployedContract.getNumberOfSubscribers()
        const expectedValue = "1"

        assert.equal(currentValue, expectedValue)
    })

    // test 10
    it("Should get all subscribers", async function() {
        await deployedContract.fund("03/05/2023", { value: ethers.utils.parseEther("2") })
        const arrayObject = await deployedContract.getSubscribers()

        const currentValue = arrayObject[0]
        const expectedValue = owner

        assert.equal(currentValue, expectedValue)
    })
})