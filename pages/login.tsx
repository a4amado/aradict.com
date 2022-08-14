import Axios from "axios";
import { verify } from "jsonwebtoken";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  ButtonSpinner,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

import Header from "../components/Header";
 
import { useTranslation } from "react-i18next";

interface FormData {
  username: string;
  password: string;
}

const Login = ({ userType }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit: SubmitHandler<FormData> = (data) => submit(data);
 

  
  return (
    <>
      <Header userType={userType} />
      
        <Head>Login to Aradict.com</Head>
        <Center height="100%" h="75%">
          <Box
            borderRadius={10}
            bg="white"
            maxWidth="600px"
            display="block"
            width="100%"
            py="10px"
            px="20px"
          >
            <Center>
              <h1>Login</h1>
            </Center>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.username}>
                <FormLabel>{t("USERNAME")}</FormLabel>
                <Input
                  aria-errormessage="#username-error-msg"
                  defaultValue=""
                  {...register("username", {
                    required: "Username is required",
                    
                  })}
                />

                <FormHelperText>Username is not case-sensitive</FormHelperText>
                <FormErrorMessage id="username-error-msg">
                  <>
                    <FormErrorIcon /> {errors.username?.message}
                  </>
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel>{t("PASSWORD")}</FormLabel>
                <InputGroup>
                  <Input
                    aria-errormessage="#password_error_msg"
                    pr="4.5rem"
                    defaultValue=""
                    type="password"
                    security="true"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 8",
                      },
                    })}
                  />
                  <InputRightElement width="4.5rem">
                    <Center>
                      <Button colorScheme="teal" h="1.5rem" size="sm">
                        show
                      </Button>
                    </Center>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage id="password_error_msg">
                  <>
                    <FormErrorIcon />
                  {errors.password?.message}
                  </>
                </FormErrorMessage>
                <FormHelperText>Username is not case-sensitive</FormHelperText>
              </FormControl>
              <FormControl>
                <Center>
                  <Button 
                    type="submit"
                    size="lg"
                    colorScheme="teal"
                  >
                    Submit
                  </Button>
                </Center>
              </FormControl>
            </form>
          </Box>
        </Center>    </>
  );

  async function submit(e) {
    
    try {
      await Axios({
        method: "POST",
        data: {
          username: e.username,
          password: e.password,
        },
        url: "/api/login",
      });
      router.reload();
    } catch (error) {
      console.log(error);
    }
  }
};

export default Login;

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Redirect from "../utils/redirect";

export const getServerSideProps = async ({ req, locale }) => {
  const TOEKN = req.cookies.token || "";
  const JWT_SECRET = process.env?.JWT_SECRET;
  const data = verify(TOEKN, JWT_SECRET, (err, data) => (!err ? data : false));

  console.log(!!data);
  if (data) return Redirect("/", false);

  const transition = await serverSideTranslations(locale, ["common"]);

  return {
    props: {
      ...transition,
    },
  };
};
