import { createRouter } from "next-connect";
import pool from "../../../DB";
import { SecondLayerAuth } from "../../../utils/Auth";

const Router = createRouter();

Router.use(...SecondLayerAuth);

Router.post(async (req, res) => {
   const { sound_id } = req.body;

  const Query = `
    UPDATE sounds
      SET rejected = true 
    WHERE sound_id = '${sound_id}'
    RETURNING sound_id;
    `;

  return pool
    .query(Query)
    .then((data) => {
      if ((data.rowCount = 0)) {
        throw "Failed To Update";
      }
      return res.json(data.rows);
    })
    .catch((error) => {
      console.log(error);
      res.status(500)
      return res.json(error);
    });
});

export default Router.handler({
  onNoMatch: (err, req, res) => {
    return res.status(404).send("sssssssss");
  },
  onError: (err, req, res) => {
    return res.status(500).send(err);
  },
});
