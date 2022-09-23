import styles from '../styles/Home.module.css'
import { useState,useEffect } from 'react'

export default function Navbar() {
    const [account, setAccount] = useState();
    const[ac1,setAc1] = useState();

    useEffect(() => {
      const loadMetamask = async () => {
        if (window.ethereum) {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          setAccount(account);
          var acc0 = account.slice(0,5)
          var acc1 = account.slice(-6)
          var acc = acc0+"......."+acc1
          setAc1(acc)
        }
        else {
          console.alert("Non-Ethereum browser detected. Please install MetaMask")
        }
      }
      loadMetamask();
  
    }, [])
    return (
        <div className={styles.navfont}>
            <nav className=" navbar navbar-light bg-dark  ">
                <a className="navbar-brand">D4Drive</a>
                <form className="form-inline">
                    <h4>Goerli-{ac1}</h4>
                </form>
            </nav>

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        </div>
    )
}
