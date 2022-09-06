import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { signIn } from "next-auth/react";

import * as Chakra from "@chakra-ui/react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import useAxios from "../hooks/useAxios";
import Redirect from "../utils/redirect";

import { getProviders, getCsrfToken } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let user;
  try {
    user = await unstable_getServerSession(ctx.req, ctx.res, authOptions);
    if (user) return Redirect("/", false);
  } catch (error) {}

  const transition = await serverSideTranslations(ctx.locale, ["common"]);

  return {
    props: {
      ...transition,
      getProviders: await getProviders(),
      getCsrfToken: await getCsrfToken(ctx),
    },
  };
};

const Login = (props) => {
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
  const toast = Chakra.useToast();

  const onSubmit = async (data) => {
    const submitting = signIn("credentials", {
      redirect: false,
      email: data.username,
      password: data.password,
      callbackUrl: "/",
    }).then((e) => {
      if (e.ok) {
        toast({
          title: "Redirecting",
          description: (
            <CountDown
              value={3}
              end={0}
              step={1}
              period={1000}
              action={() => {
                toast.closeAll();
                window.location.replace("/");
              }}
            />
          ),
        });
      } else {
        toast();
      }
    });
  };

  return (
    <>
      <Header />
      <Head>Login to Aradict.com</Head>

      <Chakra.Container width="100%" flex={1} display="flex" flexDir="column">
        <Chakra.Box
          borderRadius={10}
          bg="white"
          maxWidth="600px"
          display="block"
          width="100%"
          py="10px"
          px="20px"
        >
          <Chakra.Tabs>
            <Chakra.TabList display="flex" flexDir="row">
              <Chakra.Tab flex={1}>
                <Chakra.Center>
                  <h1>SignIn</h1>
                </Chakra.Center>
              </Chakra.Tab>
              <Chakra.Tab flex={1}>
                <Chakra.Center>
                  <h1>SignUp</h1>
                </Chakra.Center>
              </Chakra.Tab>
            </Chakra.TabList>
            <Chakra.TabPanels>
              <Chakra.TabPanel>
                <LoginForm />
              </Chakra.TabPanel>
              <Chakra.TabPanel>
                <RegisterForm />
              </Chakra.TabPanel>
            </Chakra.TabPanels>
          </Chakra.Tabs>

          <Chakra.Button onClick={() => signIn("google")}>Google</Chakra.Button>
        </Chakra.Box>
      </Chakra.Container>
      <Footer />
    </>
  );
};

export default Login;

interface CountDownProps {
  value: number;
  end: number;
  step: number;
  period: number;
  action: Function;
}

const CountDown = (data: CountDownProps) => {
  const [v, setV] = React.useState(data.value);
  const g = Chakra.useCounter({
    defaultValue: data.value,
    step: data.step,
    min: data.end,
    onChange: (_, valueAsNumber) => {
      setV(valueAsNumber);
    },
  });

  React.useEffect(() => {
    if (g.valueAsNumber === data.end) {
      data.action();
    }

    setTimeout(() => {
      g.decrement();
    }, data.period);
  }, [g, v, data]);

  return <p>{v}</p>;
};

function RegisterForm() {
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
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    shouldFocusError: true,
    delayError: 150,
  });
  const log = useAxios();

  const onSubmit = async (data) => {
    signIn("credentials", {
      redirect: false,
      email: data.username,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Chakra.Flex flexDir="row">
        <Chakra.FormControl isInvalid={!!errors.firstname}>
          <Chakra.FormLabel>{t("USERNAME")}</Chakra.FormLabel>
          <Chakra.Input
            aria-errormessage="#firstname-error-msg"
            defaultValue=""
            {...register("firstname", {
              required: "firstname is required",
            })}
          />
          <Chakra.FormErrorMessage id="firstname-error-msg">
            <>
              <Chakra.FormErrorIcon /> {errors.firstname?.message}
            </>
          </Chakra.FormErrorMessage>
        </Chakra.FormControl>

        <Chakra.FormControl isInvalid={!!errors.lastname}>
          <Chakra.FormLabel>{t("USERNAME")}</Chakra.FormLabel>
          <Chakra.Input
            aria-errormessage="#lastname-error-msg"
            defaultValue=""
            {...register("lastname", {
              required: "lastname is required",
            })}
          />
          <Chakra.FormErrorMessage id="lastname-error-msg">
            <>
              <Chakra.FormErrorIcon /> {errors.lastname?.message}
            </>
          </Chakra.FormErrorMessage>
        </Chakra.FormControl>
      </Chakra.Flex>

      <Chakra.FormControl isInvalid={!!errors.email}>
        <Chakra.FormLabel>{t("USERNAME")}</Chakra.FormLabel>
        <Chakra.Input
          aria-errormessage="#email-error-msg"
          defaultValue=""
          {...register("email", {
            required: "email is required",
          })}
        />
        <Chakra.FormErrorMessage id="email-error-msg">
          <>
            <Chakra.FormErrorIcon /> {errors.email?.message}
          </>
        </Chakra.FormErrorMessage>
      </Chakra.FormControl>

      <Chakra.FormControl isInvalid={!!errors.password}>
        <Chakra.FormLabel>{t("PASSWORD")}</Chakra.FormLabel>
        <Chakra.InputGroup>
          <Chakra.Input
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
          <Chakra.InputRightElement width="4.5rem">
            <Chakra.Center>
              <Chakra.Button colorScheme="teal" h="1.5rem" size="sm">
                show
              </Chakra.Button>
            </Chakra.Center>
          </Chakra.InputRightElement>
        </Chakra.InputGroup>
        <Chakra.FormErrorMessage id="password_error_msg">
          <>
            <Chakra.FormErrorIcon />
            {errors.password?.message}
          </>
        </Chakra.FormErrorMessage>
        <Chakra.FormHelperText>
          Username is not case-sensitive
        </Chakra.FormHelperText>
      </Chakra.FormControl>
      <Chakra.FormControl>
        <Chakra.Center>
          <Chakra.Button
            type="submit"
            size="lg"
            colorScheme="teal"
            disabled={log.isLoading}
          >
            {log.isLoading ? <Chakra.Spinner /> : "Submit"}
          </Chakra.Button>
        </Chakra.Center>
      </Chakra.FormControl>
    </form>
  );
}

function LoginForm() {
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

  const onSubmit = async (data) => {
    signIn("credentials", {
      redirect: false,
      email: data.username,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Chakra.FormControl isInvalid={!!errors.username}>
        <Chakra.FormLabel>{t("USERNAME")}</Chakra.FormLabel>
        <Chakra.Input
          aria-errormessage="#username-error-msg"
          defaultValue=""
          {...register("username", {
            required: "Username is required",
          })}
        />

        <Chakra.FormHelperText>
          Username is not case-sensitive
        </Chakra.FormHelperText>
        <Chakra.FormErrorMessage id="username-error-msg">
          <>
            <Chakra.FormErrorIcon /> {errors.username?.message}
          </>
        </Chakra.FormErrorMessage>
      </Chakra.FormControl>

      <Chakra.FormControl isInvalid={!!errors.password}>
        <Chakra.FormLabel>{t("PASSWORD")}</Chakra.FormLabel>
        <Chakra.InputGroup>
          <Chakra.Input
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
          <Chakra.InputRightElement width="4.5rem">
            <Chakra.Center>
              <Chakra.Button colorScheme="teal" h="1.5rem" size="sm">
                show
              </Chakra.Button>
            </Chakra.Center>
          </Chakra.InputRightElement>
        </Chakra.InputGroup>
        <Chakra.FormErrorMessage id="password_error_msg">
          <>
            <Chakra.FormErrorIcon />
            {errors.password?.message}
          </>
        </Chakra.FormErrorMessage>
        <Chakra.FormHelperText>
          Username is not case-sensitive
        </Chakra.FormHelperText>
      </Chakra.FormControl>
      <Chakra.FormControl>
        <Chakra.Center>
          <Chakra.Button
            type="submit"
            size="lg"
            colorScheme="teal"
            disabled={log.isLoading}
          >
            {log.isLoading ? <Chakra.Spinner /> : "Submit"}
          </Chakra.Button>
        </Chakra.Center>
      </Chakra.FormControl>
    </form>
  );
}
