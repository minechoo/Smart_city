import crypto from "crypto";
const ENCRYPTION_KEY =
  "securemade" || 'abcdefghijklmnop'.repeat(2) // Must be 256 bits (32 characters)
const IV_LENGTH = 16 // For AES, this is always 16

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv,
  )
  const encrypted = cipher.update(text)

  return (
    iv.toString('hex') +
    ':' +
    Buffer.concat([encrypted, cipher.final()]).toString('hex')
  )
}

function decrypt(text) {
  const textParts = text.split(':')
  const iv = Buffer.from(textParts.shift(), 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv,
  )
  const decrypted = decipher.update(encryptedText)

  return Buffer.concat([decrypted, decipher.final()]).toString()
}

const param = {
  msgId: crypto.randomUUID({ disableEntropyCache: true }),
  deviceId: "20202011",
  body: encrypt({
    msgType: "stat",
    list: [{ moduleId: "1", moduleName: "에어컨", status: "ON" }],
  }),
  deviceDtm: "20230526104900",
};

console.log(JSON.stringify(param));
