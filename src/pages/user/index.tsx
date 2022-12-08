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
                name: true,
                image: true,
                role: true,
                username: true,
                id: true,
                _count: {
                    select: {
                        words: true,
                        sounds: true
                    }
                }
            },
            where: {
                id: Array.isArray(ctx.query.id) ? ctx.query.id[0]: ctx.query.id
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
    
    <Chakra.Container display="flex" maxW="800px" w="100%" flexDirection="column">
        
        <NextSeo 
            title="User"
            defaultTitle="User Profile"
            robotsProps={{ maxImagePreview: "standard" }}
        />
{ !data.user &&  <Chakra.Container display="flex" maxW="800px" w="100%">
                <h1>User Not found</h1>
            </Chakra.Container>
    }
     {
        data.user && <Chakra.Container my="10px">
        <Chakra.Flex flexDir="row">
            
                
                <Chakra.Container>
                    
                    <h1 style={{ fontSize: "35px", fontWeight: "bold", direction: "ltr" }}>{data.user?.name}</h1>
                    {/* <h2 style={{ fontSize: "15px", fontWeight: "bold", direction: "ltr" }}>{data.user.role}</h2> */}
                </Chakra.Container>
                <Image src={data.user.image} width={80} height={80} />

        </Chakra.Flex>
        
        <Chakra.Flex justifyContent="stretch" flexDir="row" gap={10} w="100%" m={`10px`}>
            <NextLink href={`/user/words?id=${data.user?.id}`}>
                <Chakra.Link as={Chakra.Button} flex={1}>
                Words {data.user.words} <ExternalLinkIcon/>

                </Chakra.Link>
            </NextLink>
            <NextLink href={`/user/words?id=${data.user?.id}`} >
                <Chakra.Link as={Chakra.Button} flex={1}>
                Sounds {data.user.sounds} <ExternalLinkIcon/>

                </Chakra.Link>
            </NextLink>
        </Chakra.Flex>
    </Chakra.Container>
     }

        

    </Chakra.Container>
    </>
};




export default User