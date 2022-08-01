import styles from "./Footer.module.scss";

const Footer = () => {
  const Classes = {
    apps: styles.apps,
    app: styles.app,
    description: styles.description,
    categories: styles.categories,
    copyrights: styles.copyrights,
    appsWrapper: styles.appsWrapper,
  };
  return (
    <>
      <div className={Classes.appsWrapper}>
        <div className={Classes.apps}>
          <div className={Classes.app}>
            <img src="prodandroid.jpg" />
          </div>
          <div className={Classes.app}>
            <img src="prodchrome.jpg" />
          </div>
          <div className={Classes.app}>
            <img src="prodfirefox.jpg" />
          </div>
          <div className={Classes.app}>
            <img src="prodtelegram.jpg" />
          </div>
        </div>
      </div>
      <div className={Classes.description}>
        <h3>قاموس أرادكت</h3>
        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
        النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
        النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت
        تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات
        كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد
        لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن
        يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا
        مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر
        على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه
        التصميم فيظهر بشكل لا يليق. هذا النص يمكن أن يتم تركيبه على أي تصميم دون
        مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم.
        لأنه مازال نصاً بديلاً ومؤقتاً.
      </div>
      <div className={Classes.copyrights}>
        Made By{" "}
        <a href="https://github.com/4adel" target="_blank" rel="noreferrer">
          Ahmad Addel
        </a>{" "}
      </div>
    </>
  );
};

export default Footer;
