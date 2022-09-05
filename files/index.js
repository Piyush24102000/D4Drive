import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from './Navbar'
import Web3 from 'web3'
import { useState, useEffect } from 'react'

export default function Home() {
  const [account, setAccount] = useState();

  useEffect(() => {
    const loadMetamask = async () => {
      if (window.ethereum) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAccount(account);
      }
      else {
        console.alert("Non-Ethereum browser detected. Please install MetaMask")
      }
    }
    loadMetamask();

  }, [])
  return (
    <div>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1>Upload a file</h1>
          <div className={styles.uploadcontainer}>
            <div className={styles.bordercontainer}>
              <div className="icons fa-4x">
                <i className="fas fa-file-image" data-fa-transform="shrink-3 down-2 left-6 rotate--45"></i>
                <i className="fas fa-file-alt" data-fa-transform="shrink-2 up-4"></i>
                <i className="fas fa-file-pdf" data-fa-transform="shrink-3 down-2 right-6 rotate-45"></i>
              </div>
              <input type="file" id="file-upload" />
              <p>Drag and drop files here, or
                <a href="#" id="file-browser"> browse</a> your device.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
