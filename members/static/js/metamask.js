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
(async () => {
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
  const form = document.getElementById("addPackageForm");
  console.log("form,", form);
  form.addEventListener("submit", (e) => {
    try {
      e.preventDefault();
      let web3;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
      }
      const contract = new web3.eth.Contract(abi, contractAddress);
      const formData = new FormData(form);
      const packageid = formData.get("packageid");
      const initlocation = formData.get("initlocation");
      const action = formData.get("action");
      const undertaken = formData.get("undertaken");
      console.log(packageid, initlocation, action, undertaken);
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed or not properly configured");
      }
      // Connect to the Ethereum network using MetaMask
      (async () => {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3 = new Web3(window.ethereum);
        console.log("Get", await contract.methods.getpackage(2).call());
        const contractFunction = {
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
        };
        const functionArguments = [3, "Champa", "Delivered", "Yes"];
        const encodedData = web3.eth.abi.encodeFunctionCall(
          contractFunction,
          functionArguments
        );
        const rawTransaction = {
          from: accounts[0],
          to: contractAddress,
          value: 0,
          maxFeePerGas: (await web3.eth.getBlock()).baseFeePerGas * 2n,
          maxPriorityFeePerGas: 500,
          gasLimit: 2000000,
          nonce: await web3.eth.getTransactionCount(accounts[0]),
          data: encodedData,
        };
        const tx = await web3.eth.sendTransaction(rawTransaction);
        console.log(tx);
        tx.on("sending", (sending) => {
          console.log("Sending:", sending);
        })
          .on("sent", (sent) => {
            console.log("Sent:", sent);
          })
          .on("transactionHash", (transactionHash) => {
            console.log("Transaction Hash:", transactionHash);
          })
          .on("confirmation", (confirmation) => {
            console.log("Confirmation:", confirmation);
          })
          .on("error", (error) => {
            console.error("Error:", error);
          });
      })();
    } catch (err) {
      console.log(err);
    }
  });
})();
