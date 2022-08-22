import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
 import Header from "../components/Header";
 
export default function AddSound() {

  const {
    query: { q },
  } = useRouter();

 
  
 
  return (
    <>
      <Header  />
      
      <div>SOOOOOOOOOOOOOOOOON</div>
    </>
  );
}

import { verify } from "jsonwebtoken";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { jwtVerify } from "../utils/jwt";



const getServerSideProps:GetServerSideProps = async ({ req, locale }) => {
  const TOKEN = req.cookies.token || "";
  const JWT_SECRET = process.env.JWT_SECRET;
  
  let data;
  try {
     data = await jwtVerify(TOKEN, JWT_SECRET);
  } catch (error) {
  }
  
  const userType: any = data!.role || "";
  const translation = await serverSideTranslations(locale, ["common"]);

  return { 
    props: {
      userType,
      ...translation
    }
  }

}



