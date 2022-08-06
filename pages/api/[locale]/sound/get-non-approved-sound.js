import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { createRouter } from "next-connect";
import * as Yup from "yup";
import pool from "../../../../DB";
import { SecondLayerAuth } from "../../../../utils/Auth";

const Router = createRouter();
Router.use(...SecondLayerAuth);

Router.get(async (req, res) => {
  try {
    const Query = `
            SELECT S.sound_id , S.file_name, W.ar, W.en, W.word_id
            FROM sounds as S
            LEFT JOIN words as W
              ON S.word_id = W.word_id
            WHERE S.approved = false
            FETCH FIRST ROW ONLY;
        `;
    const Non_approved_word = await pool.query(Query);
    console.log(Non_approved_word);
    if (Non_approved_word.rowCount < 1) {
      throw "DIDN'T Find any thing";
    }
    return res.json(Non_approved_word.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

export default Router.handler({
  onNoMatch: (req, res, next) => {
     res.status(404);
     res.json({
      msg: "NOT_SOUND"
     })
  },
  onError: (req, res, next) => {
    return res.status(500).send("sssssssss");
  },
});
