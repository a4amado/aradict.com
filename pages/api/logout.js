import { serialize } from "cookie";
 import { createRouter } from "next-connect";

const Router = createRouter();
 


Router.all(async (req, res) => {
  
    res.setHeader("Set-Cookie", serialize("token", "", {
        httpOnly: true, path: "/"
    }));
    return res.writeHead(307, {
        Location: "/"
    }).end()
  
});

export default Router.handler({
  onNoMatch: (req, res, next) => {
    return res.status(404).send("sssssssss");
  },
  onError: (req, res, next) => {
    return res.status(500).send("sssssssss");
  },
});
