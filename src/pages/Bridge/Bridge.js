import React, {useState, useRef, useEffect} from 'react'
import CountdownTimer from './CountdownTimer';
import {formatData} from "./Utils";


function Bridge() {

//   function runMint(args){
//       let data = {amount: 1, btc_vault_id: 0, btc_wallet_id: "Wallet1-testnet", network: "testnet", vault_id: 0, wallet_id: 0};
//       console.log(JSON.stringify(data));
//       (async () => {
//           const rawResponse = await fetch('http://localhost:5004/mint', {
//               method: 'POST',
//               headers: {
//                   'Accept': 'application/json',
//                   'Content-Type':  'application/x-www-form-urlencoded'
//               },
//               mode: 'cors',
//               cache: 'default',
//               body: 'amount=1&btc_vault_id=0&btc_wallet_id=Wallet1-testnet&network=testnet&vault_id=0&wallet_id=0',
//           });
//           const content = await rawResponse.json();
//           console.log(content);


//       })();
//       handleClickOpen();

//   }

//   function runRedeem(args){
//       let data = {amount: 1, btc_vault_id: 0, btc_wallet_id: "Wallet1-testnet", network: "testnet", vault_id: 0, wallet_id: 0};
//       console.log(JSON.stringify(data));
//       (async () => {
//           const rawResponse = await fetch('http://localhost:5004/redeem', {
//               method: 'POST',
//               headers: {
//                   'Accept': 'application/json',
//                   'Content-Type':  'application/x-www-form-urlencoded'
//               },
//               mode: 'cors',
//               cache: 'default',
//               body: 'amount=1&btc_vault_id=0&btc_wallet_id=Wallet1-testnet&network=testnet&vault_id=0&wallet_id=0',
//           });
//           const content = await rawResponse.json();
//           console.log(content);
//       })();
//       handleClickOpen();
//   }

    const opts = {
        tooltips: {
            intersect: false,
            mode: "index"
        },
        responsive: true,
        maintainAspectRatio: false
    };

    const [currencies, setcurrencies] = useState([]);
    const [pair, setpair] = useState("");
    const [price, setprice] = useState("0.00");
    const [pastData, setpastData] = useState({});
    const ws = useRef(null);
    const idCoin = 38;
    let first = useRef(false);
    const url = "https://api.pro.coinbase.com";

    useEffect(() => {
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

        let pairs = [];

        const apiCall = async () => {
            await fetch(url + "/products")
                .then((res) => res.json())
                .then((data) => (pairs = data));

            let filtered = pairs.filter((pair) => {
                if (pair.quote_currency === "USD") {
                    return pair;
                }
            });

            filtered = filtered.sort((a, b) => {
                if (a.base_currency < b.base_currency) {
                    return -1;
                }
                if (a.base_currency > b.base_currency) {
                    return 1;
                }
                return 0;
            });


            setcurrencies(filtered);

            first.current = true;
        };

        apiCall();
    }, []);

    useEffect(() => {
        if (!first.current) {

            return;
        }


        let msg = {
            type: "subscribe",
            product_ids: [pair],
            channels: ["ticker"]
        };
        let jsonMsg = JSON.stringify(msg);
        ws.current.send(jsonMsg);

        let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
        const fetchHistoricalData = async () => {
            let dataArr = [];
            await fetch(historicalDataURL)
                .then((res) => res.json())
                .then((data) => (dataArr = data));

            let formattedData = formatData(dataArr);
            setpastData(formattedData);
        };

        fetchHistoricalData();

        ws.current.onmessage = (e) => {
            let data = JSON.parse(e.data);
            if (data.type !== "ticker") {
                return;
            }

            if (data.product_id === pair) {
                setprice(data.price);
            }
        };
    }, [pair]);

    const handleSelect = (e) => {
        let unsubMsg = {
            type: "unsubscribe",
            product_ids: ["BTC-USD"],
            channels: ["ticker"]
        };
        let unsub = JSON.stringify(unsubMsg);

        ws.current.send(unsub);

        setpair(e.target.value);
    };


    const THREE_DAYS_IN_MS = 1 * 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

    const [visible, SetVisible] = useState(true);
    const [popup, setPopup] = useState(false);
    const handleClickOpen = () => {
        setPopup(!popup);
    }

    function DownUp() {
        if (visible) {
            return (
                <div id="WRAP">
                    <p className="title">Mint anetaBTC by Wrapping BTC</p>
                    <input type="text" className="btcInput" size="30" placeholder="0.00" required/><br/>
                    <div className="lblInp">
                        BTC<br/>
                        ~ $ 0.00
                    </div>
                    <p/><p/>
                    <div className="flex-container">
                        <div className="left">Bridge Fee</div>
                        <div className="right"><img id="bit" src={require('../img/Bitcoin.png')}
                                                    alt="aneta"/><b>0</b> BTC
                        </div>
                    </div>
                    <p/><p/>
                    <div className="flex-container">
                        <div className="left">Security Deposit</div>
                        <div className="right"><img id="bit" src={require('../img/Ergo.png')} alt="aneta"/><b>0</b> ADA
                        </div>
                    </div>

                    <p/><p/>
                    <hr id="menuHR1"></hr>
                    <div className="flex-container">
                        <div className="left">You Will Receive</div>
                        <div className="right"><b>0</b> anetaBTC</div>
                    </div>
                    {/* <button onClick={() => runMint()} type="button" className="mainButton" id="mintButton"><b>Mint
                        anetaBTC</b></button> */}
                </div>
            )
        } else {
            return (
                <div id="UNWRAP">
                    <p className="title">Redeem BTC</p>
                    <input type="text" className="btcInput" size="30" placeholder="0.00" required/><br/>
                    <div className="lblInp2">
                        anetaBTC<br/>
                        ~ $ 0.00
                    </div>
                    <p/>
                    <p className="title2">BTC address</p>
                    <input type="text" className="btcInputAddress" size="30" placeholder="Enter your BTC address"
                           required/><br/>
                    <p/><p/>
                    <div className="flex-container">
                        <div className="left">BTC network Fee</div>
                        <div className="right"><img id="bit" src={require('../img/Bitcoin.png')}
                                                    alt="aneta"/><b>0</b> BTC
                        </div>
                    </div>
                    <p/><p/>
                    <div className="flex-container">
                        <div className="left">ERG network Fee</div>
                        <div className="right"><img id="bit" src={require('../img/Ergo.png')} alt="aneta"/><b>0</b> ERG
                        </div>
                    </div>

                    <p/><p/>
                    <hr id="menuHR1"></hr>
                    <div className="flex-container">
                        <div className="left">You Will Receive</div>
                        <div className="right"><b>0</b> BTC</div>
                    </div>
                    {/* <button onClick={() => runRedeem()} type="button" className="mainButton" id="mintButton">
                        <b>Confirm</b></button> */}
                </div>
            )
        }
    }

    return (


        <div>
            {popup ?
                <div className="mainPopup">
                    <div className="popup">
                        <div className="divLabel">
                            <img id="bitcoin" src={require('../img/Bitcoin.png')} alt="aneta"/> <label
                            className="labelMain"> BTC Deposit </label>
                        </div>
                        <div className="menuPopup">
                            <br/>
                            <label className="SingleTrans1">Send 1 BTC =</label>
                            <p></p>
                            {`$${price}`}&nbsp;&nbsp;&nbsp;
                            <button name="currency" value={pair} onClick={handleSelect} className="btnCrypt">

                                {currencies.slice(37, 38).map((cur, idx) => {
                                    return (
                                        <option key={idx} value="BTC-USD">
                                            {cur.display_name}

                                        </option>
                                    );
                                })}
                            </button>


                            <p/>


                            <p/>
                            <label className="SingleTrans2">In a single transaction to: </label> <p/>
                            <div type="text" className="addressBTC">
                                <p className="labelAdd">
                                    tb1q03i4ngjso93ld8ehtksnf5mndlds8rndnmqoe
                                </p>
                            </div>
                            <div className="timing">
                                <p/><CountdownTimer targetDate={dateTimeAfterThreeDays}></CountdownTimer><p/>
                            </div>
                            <br/>
                            <div className="attention">
                                <span><b>Attention:</b> Some Bitcoin wallets display values in mBTC. In </span><br/><span>this case, ensure you send the correct amount: <b>1000mBTC</b></span>
                            </div>
                            <br/>
                            <img className="qr" src={require('../img/qr.png')} alt="aneta"/>
                            <br/><br/>
                            <div className="note">
                                <b>Note:</b> Payments may take over 10 minutes to confirm. Don’t worry, your funds are
                                safe :)
                            </div>
                            <p/>
                            <button className="btnPayment">I have made the payment</button>
                        </div>
                    </div>
                </div> : ""}
            <div id="content1">
                <div id="radios">
                    <input id="rad1" type="radio" name="radioBtn" onClick={(e) => SetVisible(true)}/>
                    <label className="labels" htmlFor="rad1"><b>WRAP</b></label>
                    <input id="rad2" type="radio" name="radioBtn" onClick={(e) => SetVisible(false)}/>
                    <label className="labels" htmlFor="rad2"><b>UNWRAP</b></label>
                    <div id="bckgrnd"></div>
                </div>
                <DownUp/>
            </div>
        </div>
    )
}



export default Bridge;
