import CryptoJS from 'crypto-js';

// Function to generate a random ID
export const generateTimeRandomId = (sname, orgname, cnt, type) => {
    const timestamp = Date.now();
    const randomString = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
    const rawId = `${sname}_${orgname.substring(0, 3)}_${type}_${cnt.toString()}_${timestamp}_${randomString}`;
    return generateHash(rawId);
};

// Function to hash the ID
export const generateHash = (id) => {
    return CryptoJS.SHA256(id).toString(CryptoJS.enc.Hex);
};
