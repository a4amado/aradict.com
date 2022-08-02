import { createRouter } from "next-connect";

import { SecondLayerAuth } from "../../../../utils/Auth";
import pool from "../../../../DB";

const Router = createRouter();

Router.use(...SecondLayerAuth);

Router.post(async (req, res) => {
  console.log(req.body);
  const { sound_id } = req.body;

  const Query = `
    UPDATE sounds
      SET approved = true 
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
      res.statusCode(500);
      res.send(error);
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
