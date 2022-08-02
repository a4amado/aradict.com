import * as multer from "multer";
import { createRouter } from "next-connect";
import { resolve } from "path";
import { v4 } from "uuid";
import { ThirdLayerAuth } from "../../../../utils/Auth";
import pool from "../../../../DB";
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

Router.use(...ThirdLayerAuth);
Router.use(upload.single("audio"));

Router.post(async (req, res) => {
  const { user_id } = req.user;
  const { word_id } = req.body;
  const { encoding, mimetype, filename, size } = req.file;

  console.table([user_id, word_id, encoding, mimetype, filename, size]);

  const Query = `
    INSERT INTO sounds ( contributer_id, word_id, enc, mimetype, file_name, size )
    VALUES (
        '${user_id}',
        '${word_id}',
        '${encoding}',
        '${mimetype}',
        '${filename}',
        '${size}'
      );`;

  try {
    const new_sound = await pool.query(Query);
    console.log(new_sound);
  } catch (error) {
    console.error(error);
  }

  return res.json(req.file);
});

export default Router.handler({
  onNoMatch: (err, req, res) => {
    return res.status(404).send("sssssssss");
  },
  onError: (err, req, res) => {
    return res.status(500).send(err);
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
