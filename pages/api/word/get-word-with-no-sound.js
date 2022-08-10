import * as multer from "multer";
import { createRouter } from "next-connect";
import { resolve } from "path";
import { v4 } from "uuid";
import pool from "../../../DB";
import { SecondLayerAuth } from "../../../utils/Auth";

const Router = createRouter();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resolve("./public/sound"));
  },
  filename: function (req, file, cb) {
    cb(null, v4() + ".web");
  },
});
const upload = multer({
  storage,
});

Router.use(...SecondLayerAuth);

Router.get(async (req, res, next) => {
  const Query = `
    SELECT w.ar as ar, w.word_id, w.en as en
    FROM words as w
    LEFT JOIN sounds as s
        ON w.word_id = s.word_id
    WHERE s.sound_id IS NULL
    FETCH FIRST ROW ONLY;
  `;

  const sound = await pool.query(Query);
    
    if (sound.rowCount == 0) {
      return res.status(404).json("Resource not found")
    }



  return res.json(sound.rows);
});

export default Router.handler({
  onNoMatch: (err, req, res) => {
    return res.status(404).send("sssssssss");
  },
  onError: (err, req, res) => {
    return res.status(500).json(err);
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
