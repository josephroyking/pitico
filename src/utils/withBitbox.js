import { BITBOX } from "bitbox-sdk";

export default callback => {
  let bitboxInstance;
  if (process.env.REACT_APP_NETWORK === `mainnet`)
    bitboxInstance = new BITBOX({
      restURL: window.localStorage.getItem("restAPI") || `https://rest.bitcoin.com/v2/`
    });
  else
    bitboxInstance = new BITBOX({
      restURL: window.localStorage.getItem("restAPI") || `https://trest.bitcoin.com/v2/`
    });

  return (...args) => callback(bitboxInstance, ...args);
};
