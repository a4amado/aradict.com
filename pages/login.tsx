import Axios from "axios";
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
  Spinner,
  useCounter,
  useToast,
} from "@chakra-ui/react";
import { useForm, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    criteriaMode: "all",
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
    shouldFocusError: true,
    delayError: 150,
  });


  const log = useAxios();
  const toast = useToast()
  const onSubmit = async (data) => {
    toast.promise(log.call({
      method: "POST",
      data,
      url: "/api/login",
      responseType: "json",
    }).then((va) => {
      toast({
        status: "loading",
        title: <CountDown value={3} end={0} step={1} period={1000} action={toast.closeAll} />
      })
    })
    ,
    {
      loading: {
        title: "Loging in"
      },
      success: {
        title: "Done"
      },
      error: {
        title: "Failed",
        
      }
    })
    ;
  };

  return (
    <>
      <Header />
      <Head>Login to Aradict.com</Head>

      <Center width="100%" flex={1} display="flex" flexDir="column">
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
                    <Button
                      colorScheme="teal"
                      h="1.5rem"
                      size="sm"
                    >
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
                  disabled={log.isLoading}
                >
                  {log.isLoading ? <Spinner /> : "Submit"}
                </Button>
              </Center>
            </FormControl>
          </form>
        </Box>
      </Center>
      <Footer />
    </>
  );

  
};

export default Login;

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Redirect from "../utils/redirect";
import { jwtVerify } from "../utils/jwt";
import Head from "next/head";
import Footer from "../components/Footer";
import useAxios from "../hooks/useAxios";
import * as dynamic from "next/dynamic";

export const getServerSideProps = async ({ req, locale }) => {
  const TOEKN = req.cookies.token || "";
  const JWT_SECRET = process.env?.JWT_SECRET;
  
  try {
    let data = await jwtVerify(TOEKN, JWT_SECRET);
    if (data) return Redirect("/", false);
  } catch (error) {}

  const transition = await serverSideTranslations(locale, ["common"]);

  return {
    props: {
      ...transition,
    },
  };
};




const CountDown = ({ value, end, step, period, action }: {
  value: number, end: number, step: number, period: number, action: Function
}) => {
  const [v, setV] = React.useState(value);
  const g = useCounter({
    defaultValue: value,
    step: step,
    min: end,
    onChange: (_, valueAsNumber) => {
      setV(valueAsNumber)
    }

  });

  React.useEffect(() => {
    if (g.valueAsNumber === end) {
      action();
    }
    
    setTimeout(() => {
      g.decrement()
    }, period)
  }, [period, g, end, action, v]);
  
  return <p>{v}</p>
}

