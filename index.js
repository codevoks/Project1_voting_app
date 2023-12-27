import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from "react";
import { ethers } from "ethers";
const crypto = require('crypto');
import { abi } from "../constants/abi";
console.log(ethers.version);
console.log("trivial guy");
//connect to metamask
//run a function

const s = '30000000000000'; 

var sadsPromise = "0";
export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  var [signer,setSigner] = useState();
  var [provider,setProvider] = useState();


  function hashString(inputString) {
    const hash = crypto.createHash('sha256'); // You can use other algorithms like 'sha512' depending on your requirements
    const inputBuffer = Buffer.from(inputString, 'hex');
//    hash.update(inputString,'hex');
    hash.update(inputString);
    return hash.digest('hex');
  }
  
  async function connect()
  {
    if(typeof window.ethereum!== "undefined")
    {
      try 
      {
        await ethereum.request({ method: "eth_requestAccounts"});
        setIsConnected(true);
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        sadsPromise =await signer.getAddress();
        console.log(await sadsPromise);
      } 
      catch (e)
      {
        console.log(e);
      }
    }
    else
    {
      setIsConnected(false);
    }
}

async function execute(candidate)
{
  if(typeof window.ethereum !== "undefined")
  {
    const contractAddress = "0xc76808B82541906cd0a1D566965d2112e1461325";

        const contract = new ethers.Contract(contractAddress, abi, provider);
        console.log(await contract.getAddress());
        try
        {
          const length=16;
          const r = crypto.randomBytes(length).toString('hex');
          await window.sadsPromise;
          await window.signer;
          await window.provider; 
          console.log(sadsPromise);
          const sads = sadsPromise; 
          console.log(sads);
          const sadsHex =  await sads.toString('hex');
          const inputString = sadsHex + "#" + candidate + "#" + r;
          const functionName = 'vote';
          const argu_str = hashString(inputString);
          const functionArguments = [argu_str];
          const data = contract.interface.encodeFunctionData('vote', functionArguments);
          //const gasEstimation = await contract.vote.estimateGas(argu_str);
          //const buffergas = gasEstimation+50000;
          //console.log(buffergas);
          try {
            const transaction = await contract.vote(argu_str,{
              gasLimit: s,
              //gasLimit: gasEstimation.toString(),
              to: contractAddress,
              value: ethers.parseEther('0.001'),
              data: data,
            });
          
            const receipt = await transaction.wait();
            console.log('Transaction completed:', receipt);
          } catch (error) {
            console.error('Transaction failed:', error);
          }
        }
        catch (error)
        {
          console.log(error);
        }
      }
    }

  return (<div className={styles.container}>
     hello 
     
     {isConnected ? (
      <>
      "Connected "
      <button onClick = {()=>execute("A")}>Candidate1</button>
      <button onClick = {()=>execute("B")}>Candidate2</button>
      </>
      )
      : 
      (
      <button onClick ={() =>connect()}>Connect</button>
      )}
      </div>);
}