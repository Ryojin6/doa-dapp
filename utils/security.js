const crypto = require("crypto");

export function decrypt(encryptedString) {
    const initVector = Buffer.from(process.env.INIT_VECTOR);
    const securitykey = Buffer.from(process.env.SECRET_KEY);

    // Make the decrypter function
    const decrypter = crypto.createDecipheriv("aes-256-cbc", securitykey, initVector);

    // Decrypt the message set the input encoding and the output encoding
    let decryptedString = decrypter.update(encryptedString, "hex", "utf8");

    // Stop the decryption using the final method and set output encoding to utf8
    decryptedString += decrypter.final("utf8");

    return decryptedString;
}