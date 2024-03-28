import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const binaryString = ( text ) => {
  let binaryString = ''
  for (let i = 0; i < text.length; i++) {
    const codePoint = this.charCodeAt(i);
    const binary = codePoint.toString(2).padStart(8, '0');
    binaryString += binary;
  }
  return binaryString;
}

router.route('/').post(async (req, res) => {
    try {
      const { prompt } = req.body;
      const targetLenguage = 'en'
      console.log("test315");
      const result = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLenguage}&dt=t`, {
        method: 'POST',  
        headers: {
          'Content-Type': 'application/json',
        },
        body: binaryString("=q" + prompt)
      })
      
      console.log("test31");
      console.log(result);

      const translation = result[0][0][0];
      console.log("test1");
      console.log(translation);
      res.status(200).json({ success: true, data: translation });

    } catch (err) {
      res.status(500).json({ success: false, message: 'Translating process failed, please try again' });
    }
  });

export default router;