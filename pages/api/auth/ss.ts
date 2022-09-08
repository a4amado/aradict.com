import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
const router = nextConnect();


import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../DB";
import { encode } from "next-auth/jwt";





const pA = PrismaAdapter(prisma);

router.post( async (req: NextApiRequest, res: NextApiResponse) => {
    
    // const isUserExist = await pA.getUserByEmail(req.body.email);
    // if (isUserExist) {
    //     res.status(504).send("Email is in Use");
    // };

    try {
        await pA.createUser({
            username: req.body.username,
            email: req.body.email,
            role: "soundContributer",
            rank: 2,
            hash: req.body.password
        });

        
        
        
    res.status(201).end();        
        
    } catch (error) {
        
        res.send("Error")
    }

})



export default router;