// smart contract abi
import SubscriptionService_abi from "./abi.json"

// css
import "./home.css"

// hooks
import { useState } from 'react'

// ethers
import { ethers } from 'ethers'

// components
import ServiceCard from "../../components/dashboard/ServiceCard";

const Home = () => {

  // ethers.js state
  const [ address, setAddress] = useState("")
  const [ provider, setProvider ] = useState(null)
  const [ signer, setSigner ] = useState(null)
  const [ contract, setContract ] = useState(null)
  const [ contractAddress, setContractAddress ] = useState("0xDE002eE5f675938BfC9Ef153306835e76EA2ef53")
 
  // connect to Metamask
  const connectWallet = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      // get Metamask account and ask to connect to it
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result => {
        accountChangedHandler(result[0])
        console.log(`Metamask account connected! \n\n result: ${result}`)
      })
    } else {
      console.log("Install Metamask")
    }
  }

  const configureEthers = () => {
    // configure provider
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);
    
    // configure signer (private key)
    const tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);
    
    // configure contract
    const tempContract = new ethers.Contract(contractAddress, SubscriptionService_abi, tempSigner);
    setContract(tempContract);	
  }

  // configure ethers.js 
  const accountChangedHandler = async (address) => {
    setAddress(address)
    configureEthers();
  }

  return (
    <div className="home-main">
      <div className="top">
      { 
            contract != null && 

            <>
              <p className="mainText"> Connected </p>
              <p className="mainText"> {`Address ${address}`} </p>
            </>
          
          }
      </div>
      <div className="bottom">
          { 
            provider == null ? <button onClick={ connectWallet } type="button" className="btn btn-outline-primary btn-lg button-width m-4">Connect</button>
            :
            <ServiceCard contract={contract} />
          }
      </div>  
    </div>
  )
}

export default Home