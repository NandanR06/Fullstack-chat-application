
import crypto from "crypto";
export const generateOtp = ()=>{
    const otp = crypto.randomBytes(6).toString("hex").slice(0, 6);
    return otp;
}