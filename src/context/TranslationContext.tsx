import React, { createContext, useContext } from "react";
import enUS from "@frontend/assets/langs/en-US.json";
import ptPT from "@frontend/assets/langs/pt-PT.json";
import { SettingsContext } from "@frontend/context/SettingsContext";

export const languages = [
  {
    code: "en-US",
    text: "English - United States",
  },
  {
    code: "pt-PT",
    text: "Português - Portugal",
  },
];

export const TContext = createContext<Record<string, string>>({});

export const t = (key: string) => {
  const tContext = useContext(TContext);

  if (tContext[key] === undefined) {
    return key;
  } else {
    return tContext[key];
  }
};

export const T: React.FC<{ children?: React.ReactNode }> = ({
  children = "",
}) => {
  const tContext = useContext(TContext);

  return (
    <>
      {typeof children === "string" &&
        (children === undefined ? children : tContext[children])}
    </>
  );
};

export const useTranslation = () => {
  const tContext = useContext(TContext);

  const translate = (key: string) => {
    if (tContext[key] !== undefined) {
      return tContext[key];
    } else {
      return key;
    }
  };

  return {
    t: translate,
  };
};

const TranslationProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { language } = useContext(SettingsContext);

  let lang = enUS;

  console.log(language);

  switch (language) {
    case "en-US":
      lang = enUS;
      break;
    case "pt-PT":
      lang = ptPT;
      break;
  }

  return <TContext.Provider value={lang}>{children}</TContext.Provider>;
};

export default TranslationProvider;
