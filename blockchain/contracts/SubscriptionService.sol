// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SubscriptionService {

    /* State variables */
    // address of the owner
    address private immutable i_owner;

    // name of the subscription
    string private subscriptionName;

    // price for subscription
    uint256 private subscriptionPrice;

    // array of subscribers
    address[] private subscribers;

    // mapping of subscriber addresses to subscription expiry date
    mapping(address => string) public subscriptions;


    /* Modifiers */
    modifier onlyOwner() {
        require(msg.sender == i_owner, "Not owner!");
        _;
    }


    /* Constructor */
    constructor(string memory nameOfSubscription, uint256 priceForSubscription) {
        i_owner = msg.sender;
        subscriptionName = nameOfSubscription;
        subscriptionPrice = priceForSubscription;
    }


    /* Getters */
    // get the name of the subscription
    function getSubscriptionName() public view returns (string memory) {
        return subscriptionName;
    }


    // get the price for subscription
    function getSubscriptionPrice() public view returns (uint256) {
        return subscriptionPrice;
    }

    // get owner address
    function getOwnerAddress() public view returns(address) {
        return i_owner;
    }

    // get current balance
    function getCurrentBalance() public view returns(uint256) {
        return address(this).balance;
    }

    // get subscribers
    function getSubscribers() public view returns (address[] memory) {
        return subscribers;
    }

    // get the number of people that paid for subscriptions
    function getNumberOfSubscribers() public view returns (uint256) {
        return subscribers.length;
    }

    // get expiry date associated to customer from address => expiry_date mapping 
    function getExpiryDate(address _customer) public view returns (string memory) {
        return subscriptions[_customer];
    }


    /* Setters */
    function setSubscriptionName(string memory _newName) public onlyOwner {
        subscriptionName = _newName;
    }

    function setPrice(uint256 _newPrice) public onlyOwner {
        subscriptionPrice = _newPrice;
    }


    /* Payable functions */
    // pay for subscription if amount sent >= subscriptionPrice
    function fund(string memory _expiration_date) public payable {
        // ensure that value of Eth sent is greater than or equals the subscription price
        require(msg.value >= subscriptionPrice);

        // add subscriber to subscribers array
        subscribers.push(msg.sender);

        // add a mapping of subscriber to subscription_expiration_date
        subscriptions[msg.sender] = _expiration_date;
    }
    
    // withdraw money from contract if owner
    function withdraw() public onlyOwner {

        /*
            "call" is powerful, enables invoking any Eth function.
            using "call" is prefered way of sending and receiving an Ethereum token.
            call has no cap on GAS, returns bool
            (bool callSuccess, bytes memory dataReturned) = payable(msg.sender).call{value: address(this).balance}("");
        */

        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

}
