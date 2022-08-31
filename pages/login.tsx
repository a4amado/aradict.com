import JWT from 'jsonwebtoken';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as Chakra from '@chakra-ui/react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import useAxios from '../hooks/useAxios';
import Redirect from '../utils/redirect';

export const getServerSideProps = async ({ req, locale }) => {
  console.log(req.cookies);

  let user;
  try {
    user = JWT.verify(req.cookies["token"], process.env.JWT_SECRET);
    if (user) return Redirect("/", false);
  } catch (error) {}

  const transition = await serverSideTranslations(locale, ["common"]);

  return {
    props: {
      ...transition,
    },
  };
};

const Login = () => {
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
    toast.promise(
      log.call({
        method: "POST",
        data,
        url: "/api/login",
      }),

      {
        loading: {
          title: "Loging in",
        },
        success: {
          title: "Redirecting",
          description: (
            <CountDown
              value={3}
              end={0}
              step={1}
              period={1000}
              action={() => {
                toast.closeAll();
                Router.replace({ pathname: "/" }, Router.asPath, {
                  locale: Router.locale,
                });
              }}
            />
          ),
        },
        error: {
          title: "Failed",
        },
      }
    );
  };

  return (
    <>
      <Header />
      <Head>Login to Aradict.com</Head>

      <Chakra.Center width="100%" flex={1} display="flex" flexDir="column">
        <Chakra.Box
          borderRadius={10}
          bg="white"
          maxWidth="600px"
          display="block"
          width="100%"
          py="10px"
          px="20px"
        >
          <Chakra.Center>
            <h1>Login</h1>
          </Chakra.Center>
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
        </Chakra.Box>
      </Chakra.Center>
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
