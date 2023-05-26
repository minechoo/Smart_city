import encUtils from "./encUtils.js";
import moment from "moment";

//장비 body
const body = {
  msgType: "stat",
  list: [{ moduleId: "1", moduleName: "에어컨", status: "ON" }],
};

//장비 상태 payload
const payload = {
  msgId: encUtils.uuid(),
  body,
  deviceId: "20202011",
  deviceDtm: moment().format("YYYYMMDDHHmmss"),
};

console.log("non enctyped payload >>>>>>>>>>>>>> ");
console.log(payload);

console.log("non enctyped payload >>>>>>>>>>>>>> ");
console.log(JSON.stringify(payload, null, 2));

payload.body = encUtils.encrypt(JSON.stringify(payload.body));

console.log("enctyped payload >>>>>>>>>>>>>> ");
console.log(JSON.stringify(payload, null, 2));

const bodyObj  = JSON.parse(encUtils.decrypt(payload.body));
console.log('decrypt >> parsed body ');
console.log(bodyObj);

