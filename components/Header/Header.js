import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { MultiLanguageContext } from "../../state/language.context";
import styles from "./Header.module.scss";
import Logo from "../../resources/abadis.svg";

const Header = ({ userType }) => {
  const Router = useRouter();
  const Text = useContext(MultiLanguageContext);
  const [activeMenu, SetActiveMEnu] = useState(false);
  React.useEffect(() => {
    SetActiveMEnu(false);
  }, [Router]);
  const Classes = {
    header: styles.header,
    list: `${styles.list} ${activeMenu && styles.active_MOB_MEN}`,
    topBar: styles.topBar,
    logo: styles.logo,
    headerWrapper: styles.headerWrapper,
    mob_btn: styles.mob_btn,
  };
  return (
    <>
      <div className={Classes.headerWrapper}>
        <div className={Classes.header}>
          <Link href="/">
            <a className={Classes.logo}>
              <Image src={Logo} width={150} height={40} />
            </a>
          </Link>
          <div className={Classes.list}>
            {Router.pathname != "/" && (
              <Link href="/">
                <a>{Text.activeLanguage.home}</a>
              </Link>
            )}
            {!userType && (
              <Link href="/login">
                <a>{Text.activeLanguage.login}</a>
              </Link>
            )}
            {userType === "admin" && (
              <>
                <Link href="/dashboard">
                  <a>{Text.activeLanguage.dashboard}</a>
                </Link>
                <Link href="/sound-reviewer">
                  <a>{Text.activeLanguage.reviewSound}</a>
                </Link>

                <Link href="/sound-contributer">
                  <a>{Text.activeLanguage.contributeSound}</a>
                </Link>
              </>
            )}
            {userType === "sound-contributer" && (
              <>
                <Link href="/sound-contributer">
                  <a>{Text.activeLanguage.contributeSound}</a>
                </Link>
              </>
            )}
            {userType === "sound-reviewer" && (
              <>
                <Link href="/sound-reviewer">
                  <a>{Text.activeLanguage.reviewSound}</a>
                </Link>
                <Link href="/sound-contributer">
                  <a>{Text.activeLanguage.contributeSound}</a>
                </Link>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => SetActiveMEnu(!activeMenu)}
          className={Classes.mob_btn}
        >
          Menu
        </button>
      </div>
    </>
  );
};

export default Header;
