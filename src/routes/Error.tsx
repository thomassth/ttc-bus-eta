import { Title1 } from "@fluentui/react-components";
import { useTranslation } from "react-i18next";

import style from "./Error.module.css";

export default function ErrorPage() {
  const { t } = useTranslation();

  return (
    <article className={style.error}>
      <Title1>Error</Title1>
      <p>{t("error.notFound")}</p>
    </article>
  );
}
