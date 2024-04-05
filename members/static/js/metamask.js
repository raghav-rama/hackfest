let web3 = new Web3(
  Web3.givenProvider ||
    "https://base-sepolia.g.alchemy.com/v2/96xXtj4zQEQUj4Xst1FETvqALkwJu-q8"
);
const privateKey =
  "0xdc13e986ba934c6f1633f75f9fbfe01cbea7608b8e4559b206b81880e752d242";
const pubKey = "0x44e5B03a36c71180EF74CFFF6C6f8369074cF79F";
const contractAddress = "0x0aAb38709774593d1641a7F902022Be729Be9986";
const abi = [
  {
    inputs: [
      {
        internalType: "int256",
        name: "packageid",
        type: "int256",
      },
      {
        internalType: "string",
        name: "initlocation",
        type: "string",
      },
      {
        internalType: "string",
        name: "action",
        type: "string",
      },
      {
        internalType: "string",
        name: "undertaken",
        type: "string",
      },
    ],
    name: "addpackage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "packageid",
        type: "int256",
      },
    ],
    name: "getpackage",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
let blockNumber = web3.eth.getBlockNumber().then(console.log);
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
const contract = new web3.eth.Contract(abi, contractAddress);
console.log(account, contract);
(async () => {
  console.log(await contract.methods.getpackage(0).call());
  document
    .getElementById("connectButton")
    .addEventListener("click", async () => {
      //check if Metamask is installed
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        // Request the user to connect accounts (Metamask will prompt)
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Get the connected accounts
        const accounts = await web3.eth.getAccounts();

        // Display the connected account
        document.getElementById("connectedAccount").innerText = accounts[0];
      } else {
        // Alert the user to download Metamask
        alert("Please download Metamask");
      }
    });
  document.getElementById("addPackage").addEventListener("click", async () => {
    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed or not properly configured");
      }
      // Connect to the Ethereum network using MetaMask
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const web3 = new Web3(window.ethereum);
      const tx = await contract.methods
        .addpackage(0, "Athens", "Delivered", "Yes")
        .call();
      console.log(tx);
      tx.on("sending", (sending) => {
        // Sending example
        console.log("Sending:", sending);
      })
        .on("sent", (sent) => {
          // Sent example
          console.log("Sent:", sent);
        })
        .on("transactionHash", (transactionHash) => {
          // Transaction hash example
          console.log("Transaction Hash:", transactionHash);
        })
        .on("confirmation", (confirmation) => {
          // Confirmation example
          console.log("Confirmation:", confirmation);
        })
        .on("error", (error) => {
          // Error example
          console.error("Error:", error);
        });
    } catch (err) {
      console.log(err);
    }
  });
})();
