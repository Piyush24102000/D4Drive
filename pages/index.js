import styles from '../styles/Home.module.css'
import Navbar from './Navbar'
import Web3 from 'web3'
import { useState, useEffect } from 'react'
import { abi, address } from "../data"
import axios from 'axios'

export default function Home() {

  var arr = [];
  var namearr = [];
  var typearr = [];
  var sizearr = [];
  var descarr = [];

  const [hash, setfiles] = useState();
  const [name, setName1] = useState();
  const [size, setSize1] = useState();
  const [desc, setDesc1] = useState();
  const [type, setType1] = useState();
  const [loc, setloc] = useState();
  const [fileImg, setFileImg] = useState(null);
  const [getname, setName] = useState();
  const [gettype, setType] = useState();
  const [getsize, setSize] = useState();
  const [getdesc, setDesc] = useState();

  const getid = (e) => {
    try {
      setFileImg(e.target.files[0]);
      setName(e.target.files[0].name);
      setType(e.target.files[0].type);
      setSize(e.target.files[0].size);

    } catch (error) {
      console.log(error);
    }
  }
  const getdescri = (e) => {
    setDesc(e.target.value)
  }
  ////////////Loops////////////
  for (let k in hash) {
    let v1;
    v1 = hash[k];
    arr.push(v1);
  }
  var k1; //Keys
  var k2;
  k1 = Object.keys(arr);
  k2 = k1.reverse();

  var v1; //Values
  var v2;
  v1 = Object.values(arr);
  v2 = v1.reverse();

  ///////Get name//////
  for (let k in name) {
    let n1;
    n1 = name[k];
    namearr.push(n1);
  }
  var n2;
  var n3;
  n2 = Object.values(namearr);
  n3 = n2.reverse();

  ////////Get Size//////
  for (let k in size) {
    let s1;
    s1 = size[k];
    sizearr.push(s1);
  }
  var s2;
  var s3;
  s2 = Object.values(sizearr);
  s3 = s2.reverse();

  ///////Get Type///////
  for (let key in type) {
    let t1;
    t1 = type[key];
    typearr.push(t1);
  }
  var t2;
  var t3;
  t2 = Object.values(typearr);
  t3 = t2.reverse();

  ////////Get Desc//////
  for (let k in desc) {
    let d1;
    d1 = desc[k];
    descarr.push(d1);
  }
  var d2;
  var d3;
  d2 = Object.values(descarr);
  d3 = d2.reverse();

  /////////Load Metamask//////////
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

  ///////////////Pinata Ipfs///////////////
  const sendFileToIPFS = async () => {

    if (fileImg) {
      try {
        const formData = new FormData();
        formData.append("file", fileImg);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            'pinata_api_key': `${process.env.NEXT_PUBLIC_PINATA_KEY}`,
            'pinata_secret_api_key': `${process.env.NEXT_PUBLIC_PINATA_SECRET}`,
            "Content-Type": "multipart/form-data"
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        setloc(`https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`)

      } catch (error) {
        console.log(error)
      }
    }
  }
  /////////////////////////////////////

  const add_files = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider || 'https://eth-goerli.g.alchemy.com/v2/Uogwg-bORIX7JuY6fhEGKFugk3qRwzWM'); //Change this to provider
      var myContract = new web3.eth.Contract(abi, address);
      await myContract.methods.add(account, getname, getdesc, gettype, getsize, loc).send({ from: account })

    } catch (error) {
      console.log(error);
    }
  }
  /////////////////////////////////

  useEffect(() => {
    const timer = setTimeout(() => {
      const get_files = async () => {
        try {
          const web3 = new Web3(Web3.givenProvider || 'https://eth-goerli.g.alchemy.com/v2/Uogwg-bORIX7JuY6fhEGKFugk3qRwzWM');
          var myContract = new web3.eth.Contract(abi, address);
          var getFiles = await myContract.methods.get(account).call();
          setName1(getFiles[0]);
          setDesc1(getFiles[1]);
          setType1(getFiles[2]);
          setSize1(getFiles[3]);
          setfiles(getFiles[4]);
        } catch (error) {
          console.log(error);
        }
      }
      get_files();
    }, 5000);
    return () => clearTimeout(timer);
  })
  /////////////////////////////////

  return (
    <div>
      <Navbar />
      {/* Blocks frontend */}
      <div>
        <div className={styles.head}>
          <h3>&#9733; D4Drive is a <b>blockchain</b> powered storage platform &#9733;</h3>
        </div>
        <div className={styles.square}>
        </div>
        <div className={styles.square1}>
        </div>
        <div className={styles.square2}>
        </div>
        <hr className={styles.line}></hr>
        <hr className={styles.line1}></hr>

        <div className={styles.input}>
          <input type='file' onChange={getid} />
        </div>
        <div className={styles.desc}>
          <h3>Description</h3>
          <textarea className={styles.desctext} onChange={getdescri}></textarea>
        </div>

        <div className={styles.button}>
          <button type="button" onClick={sendFileToIPFS}>Upload</button>
        </div>

        <div className={styles.mine}>
          <button className={styles.minebutton} type='button' onClick={add_files}>Mine the Blocks</button>
        </div>

        {/* ////////////////////////////////////////////////////////// */}

        {/* <div className="form-group ml-6"> */}
        <div className={styles.table}>
          <div className="row">

            <div className={styles.c1}>
              <h2>Index</h2>
              {k2.map(i => (
                <p>{i}</p>
              ))}
            </div>

            <div className={styles.c2}>
              <h2>Name</h2>
              {n3.map(i => (
                <p>{i.slice(0,11)}</p>
              ))}
            </div>

            <div className={styles.c3}>
              <h2>Description</h2>
              {d3.map(i => (
                <p>{i}</p>
              ))}
            </div>

            <div className={styles.c4}>
              <h2>Type</h2>
              {t3.map(i => (
                <p>{i}</p>
              ))}
            </div>

            <div className={styles.c5}>
              <h2>Size</h2>
              {s3.map(i => (
                <p>{i / 1000} KB</p>
              ))}
            </div>

            <div className={styles.c6}>
              <h2>View</h2>
              {v2.map(i => (
                <p><a href={i} target="_blank">......{i.slice(-15)}</a></p>
              ))}
            </div>

          </div>
        </div>
      </div>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    </div>
  )
}
