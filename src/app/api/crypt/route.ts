import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { type, text, password } = await req.json();
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
    return Response.json({ result }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({}, { status: 400 });
  }
}
