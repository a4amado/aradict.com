import { serialize } from "cookie";
import NC from "next-connect";


const Router = NC({
  onError: (err, req, res) => {
      res.status(500).send(err).end()
  },
  onNoMatch: (req, res) => {
    res.status(404).send("Not Found").end()
},
})
 


Router.all(async (req, res) => {
  
    res.setHeader("Set-Cookie", serialize("token", "", {
        httpOnly: true, path: "/"
    }));
    return res.writeHead(307, {
        Location: "/"
    }).end()
  
});

export default Router;