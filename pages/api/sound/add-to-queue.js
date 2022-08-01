import * as multer from "multer";
import { createRouter } from "next-connect";
import { resolve } from "path";
import { v4 } from "uuid";
import { ThirdLayerAuth } from "../../../utils/Auth";
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

Router.post((req, res) => {
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
