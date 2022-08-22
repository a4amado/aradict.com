import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
 import Header from "../components/Header";
 
export default function AddSound({ userType }) {

  const {
    query: { q },
  } = useRouter();

 
  
 
  return (
    <>
      <Header userType={userType} />
      
      <div>SOOOOOOOOOOOOOOOOON</div>
    </>
  );
}

import { verify } from "jsonwebtoken";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


interface UserTOKENDecoded {
  role: string;
}
const getServerSideProps:GetServerSideProps = async ({ req, locale }) => {
  const TOKEN = req.cookies.token || "";
  const JWT_SECRET = process.env.JWT_SECRET;
  
  const data = verify(TOKEN, JWT_SECRET, (err, data) => !err || !data ? data: false );
  
  const userType: any = data!.role || "";
  const translation = await serverSideTranslations(locale, ["common"]);

  return { 
    props: {
      userType,
      ...translation
    }
  }

}



