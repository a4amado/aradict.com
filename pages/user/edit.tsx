import { GetServerSidePropsContext } from "next"
import Router from "next/router";
import * as Chakra from "@chakra-ui/react";
import { NextSeo } from 'next-seo';
import prisma from "../../DB";
import Image from "next/image";
import Header from "../../components/Header";
import NextLink from "next/link";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


const  getServerSideProps =  async (ctx: GetServerSidePropsContext) => {


    
  


    let user;
    try {
        user = await prisma.user.findUnique({
            select: {
                accounts: {
                    select: {
                        provider: true,
                        expires_at: true
                    }
                },
                email: true,
                emailVerified: true,
                image: true,
                locale: true,
                username: true,
                rank: true
            },
            where: {
                id: ''
            }
        });
        console.log(user);
        
    } catch (error) {
        console.log(error);
    };

    const gg = await serverSideTranslations(ctx.locale, ["common"])
    
        return {
            props: {
                user,
                ...gg
                
            }
        }
    

    

}

export { getServerSideProps }

const User = (data) => {
    
    

    


    return  <>
    <Header />
    <Chakra.Container maxW="800px" w="100%" display="flex" flexDir="column">


    <Chakra.Flex>
        You are conntected via <>
        {
            data.user.providers.map((e, i) => <p key={i}>{e}</p>)
        }
        </>
    </Chakra.Flex>

    </Chakra.Container>
    
    
    </>
};




export default User