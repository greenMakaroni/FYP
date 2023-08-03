import "./card.css"
import { useState, useEffect } from 'react';
const ServiceCard = ({contract}) => {

    const [ name, setName ] = useState("")
    const [ price, setPrice ] = useState("")
    const [ subscribers, setSubscribers ] = useState("")
    const [ balance, setBalance ] = useState("")
    const [ owner, setOwner ] = useState("")

    useEffect(() => {
  
      const getName = async () => {
        const newName = await contract.getSubscriptionName()
        setName(newName)
      }

      const getBalance = async () => {
        const newBalance = await contract.getCurrentBalance()
        const number = parseInt(newBalance["_hex"])
        setBalance(number)
      }

      const getNumberOfSubscribers = async () => {
        const newNum = await contract.getNumberOfSubscribers()
        const parsedNum = parseInt(newNum["_hex"])
        setSubscribers(parsedNum)
      }

      const getPrice = async () => {
        const newPrice = await contract.getSubscriptionPrice()
        const parsePrice = parseInt(newPrice["_hex"])
        setPrice(parsePrice)
      }

      const getOwner = async () => {
        const newOwner = await contract.getOwnerAddress()
        setOwner(newOwner)
      }

      const getAllSubscribers = async () => {
        const allSubs = await contract.getSubscribers()
        console.log("all subs: ", allSubs);
      }

      getName()
      getBalance()
      getNumberOfSubscribers()
      getPrice()
      getOwner()
      getAllSubscribers()

    }, [])

  return (
    <div style={{width: "90%", height: "90%"}} className="card text-bg-dark border-primary mb-3 m-5 col-5 background-custom">
        <div className="card-header"> {name} </div>
        <div className="card-body">
            <h4 className="card-title"> Owner: <span className="green">{owner}</span></h4>
            <h4 className="card-title"> Price: <span className="green">{price} Eth</span></h4>

            <div className="card-body-full">
                <div className="half-card">
                    <h5 className="card-title"> Total subscribers </h5>
                    <p className="card-text green"> { subscribers } </p>
                </div>

                <div className="half-card">
                    <h5 className="card-title">Total revenue</h5>
                    <p className="card-text green"> { balance } Eth</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ServiceCard