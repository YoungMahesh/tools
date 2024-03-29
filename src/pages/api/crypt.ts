import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { type, text, password } = await JSON.parse(req.body);
      const algorithm = "aes-192-cbc";
      const key = crypto.scryptSync(password, "salt", 24);
      const iv = Buffer.alloc(16, 0);

      let result = "";
      if (type === "encrypt") {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(text, "utf8", "hex");
        encrypted += cipher.final("hex");
        result = encrypted;
      } else if (type === "decrypt") {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(text, "hex", "utf8");
        decrypted += decipher.final("utf8");
        result = decrypted;
      }
      res.status(200).send({ result });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  }
}
