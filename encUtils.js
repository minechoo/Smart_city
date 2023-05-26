import crypto from "crypto";
import moment from "moment";

String.prototype.lpad = function (padLength, padString) {
  let arrTxt = this;
  while (arrTxt.length < padLength) arrTxt = padString + arrTxt;
  return arrTxt;
};

const ENCRYPTION_KEY = "secumade"; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

const utils = {
  ENCRYPTION_KEY: "secumade",
  IV_LENGTH: 16,
  uuid :()=>{
    return crypto.randomUUID({ disableEntropyCache: true })
  },
  encrypt: (text) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY.lpad(32, "0")),
      iv
    );
    const encrypted = cipher.update(text);

    return (
      iv.toString("hex") +
      ":" +
      Buffer.concat([encrypted, cipher.final()]).toString("hex")
    );
  },
  decrypt: (text) => {
    const textParts = text.split(":");
    const iv = Buffer.from(textParts.shift(), "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY.lpad(32, "0")),
      iv
    );
    const decrypted = decipher.update(encryptedText);
    return Buffer.concat([decrypted, decipher.final()]).toString();
  },
};

export default utils;