import CryptoJS from "crypto-js";
const secretKey = "6JGyUdeIY8";
export function encryptData(data: any) {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return ciphertext;
}

export function decryptData(ciphertext: any) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}
