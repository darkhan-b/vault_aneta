// import React from 'react'
// import react, {useState} from "react";
//
// function Vault() {
//
//
//     const [active, setActive] = useState(0)
//
//     function VaultSetUp() {
//         return (
//             <div className="vault-set-up">
//                 <div className="vault-set-up-text">Vault Set Up</div>
//                 <div className="vault-amount-block">
//                     <div className="vault-amount-text">
//                         <p id="p">Vault Amount</p>
//                     </div>
//                     <br/>
//                     <div className="vault-input-block">
//                         <img src={require('../img/Bitcoin.png')} id="vault-icon"/>
//                         <input className="vault-input" type="text" placeholder="Enter ERG quantity"/>
//                     </div>
//                 </div>
//                 <div className="gradient-button" onClick={(e) => setActive(2)}>Continue</div>
//             </div>
//         )
//     }
//
//     function VaultDeposit() {
//         return (
//             <div className="vault-deposit">
//                 <div className="vault-deposit-text">Vault Collateral Deposit</div>
//                 <div className="send-text">Send 3000 ERG</div>
//                 <div className="transaction-info-block">
//                     <div className="transaction-block">
//                         <div className="transaction-text"><p>In a single transaction to: </p></div>
//                         <div className="transaction-input">
//                             9b1q03i4ngjso93ld8ehtksnf5mndlds8rndnmqoe
//                             <img src={require('../img/copy.png')} id="copy-icon"/>
//                         </div>
//                     </div>
//                     <div className="time-info">
//                         <p>Within </p>
//                         <p id="time-text">&nbsp;0 Days 23:59:33</p>
//                     </div>
//                     <div className="qr1">
//                         <img src={require('../img/qr.png')}/>
//                     </div>
//                 </div>
//                 <div className="blue-button" onClick={(e) => setActive(3)}>I have made the payment</div>
//             </div>
//         )
//     }
//
//     function MyVault() {
//         return (
//             <div className="my-vault-block">
//                 <div className="my-vault-text">My Vault</div>
//                 <div className="my-vault-info">
//                     <div className="my-vault-info-item">
//                         <div className="first-col">My Collateral:</div>
//                         <div className="second-col">10000 ERG</div>
//                     </div>
//                     <div className="my-vault-info-item">
//                         <div className="first-col">ERG Collateral Wallet ID:</div>
//                         <div className="second-col">9gjzak4o4m669wmfi3kl4okmf9dig0</div>
//                     </div>
//                     <div className="my-vault-info-item">
//                         <div className="first-col">BTC Wallet ID:</div>
//                         <div className="second-col">9gjzak4o4m669wmfi3kl4okmf9dig0</div>
//                     </div>
//                     <div className="my-vault-info-item">
//                         <div className="first-col">anetaBTC minted from your vault</div>
//                         <div className="second-col">3.3 nBTC</div>
//                     </div>
//                     <div className="my-vault-info-item">
//                         <div className="first-col">Collateral utilization rate</div>
//                         <div className="second-col">88%</div>
//                     </div>
//                     <div className="my-vault-info-item">
//                         <div className="first-col">Net APR</div>
//                         <div className="second-col">4.33%</div>
//                     </div>
//                 </div>
//                 <div className="my-vault-but">
//                     <div className="gradient-button" onClick={(e) => setActive(0)}>Close Vault</div>
//                 </div>
//             </div>
//         )
//     }
//
//     return (
//
//         <div className="page">
//             <div className="main-block">
//                 <div className="page-topic">BTC Vault</div>
//                 <div className="content-block">
//                     {active == 0 && (
//                         <div className="gradient-button" id="operate-button" onClick={(e) => setActive(1)}>Operate an
//                             anetaBTC vault </div>
//                     )}
//
//                     {active == 1 && (
//                         <VaultSetUp/>
//                     )}
//
//                     {active == 2 && (
//                         <VaultDeposit/>
//                     )}
//
//                     {active == 3 && (
//                         <MyVault/>
//                     )}
//
//
//                 </div>
//             </div>
//         </div>
//     // <div>
//     //     <h2 className='calling'>BTC Vault</h2>
//     //     <div className='mainmenu_transaction'>
//     //         <div className="feedback-page__content-btn_op">Operate an anetaBTC vault</div>
//     //
//     //     </div>
//     // </div>
// )
// }
//
//
// export default Vault;
