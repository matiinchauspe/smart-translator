import { useEffect, useState } from "react";

import { IconArrowsExchange2, IconTrash } from "@tabler/icons-react";
import { motion } from "framer-motion";

import { pulse } from "@animations/index";

import { AUTO_DETECT, SUPPORTED_LANGUAGES } from "@constants/index";
import { useDebounce, useStore } from "@hooks/index";
import { FromLang, Lang } from "@internal-types/index";
import { makeOptionsFromLangSelection } from "@utils/index";

import { GenerateService } from "@services/index";

import { Dropdown, TextArea } from "@components/index";
import { BaseLayout } from "@layout/index";

const App = () => {
  const {
    // state
    fromLang,
    toLang,
    text,
    translatedText,
    isTranslating,
    // actions
    setFromLang,
    setToLang,
    setText,
    setTranslatedText,
    interchangeLangs,
  } = useStore();
  const debouncedText = useDebounce(text, 500);
  const [detectedLang, setDetectedLang] = useState("");

  const handleInterchangeLangs = () => interchangeLangs();

  const handleChangeFromLang = (lang: string) => setFromLang(lang as FromLang);

  const handleChangeToLang = (lang: string) => setToLang(lang as Lang);

  const optionsFromLang = makeOptionsFromLangSelection({
    [AUTO_DETECT]: `Detect language ${
      detectedLang ? `- (${detectedLang})` : ""
    }`,
    ...SUPPORTED_LANGUAGES,
  });
  const optionsToLang = makeOptionsFromLangSelection(SUPPORTED_LANGUAGES);

  useEffect(() => {
    if (debouncedText === "") return;

    // pasar esto a una api
    GenerateService.translate({
      text: debouncedText,
      fromLanguage: fromLang,
      toLanguage: toLang,
    })
      .then((res) => {
        if (res == null) return;
        let result = res;

        if (fromLang === AUTO_DETECT) {
          const detectedLangBegin = res.indexOf("((");
          const detectedLangEnd = res.indexOf("))") + 2;

          result = res.slice(0, detectedLangBegin);
          const detectedLang = res.slice(
            detectedLangBegin + 2,
            detectedLangEnd - 2
          );
          setDetectedLang(detectedLang);
        }
        setTranslatedText(result);
      })
      .catch((err) => {
        console.error(err);

        setTranslatedText("Error");
      });
  }, [debouncedText, fromLang, toLang]);

  return (
    <div className="bg-teal-50">
      <BaseLayout>
        <div className="border border-teal-300 rounded-md text-base flex flex-col shadow-lg shadow-gray-300">
          <div className="border-b border-teal-300 p-5 flex gap-4 items-center">
            {/* FromLang */}
            <div className="flex-1">
              <Dropdown
                options={optionsFromLang}
                selected={fromLang}
                onChange={handleChangeFromLang}
              />
            </div>
            {/* Interchange */}
            <div className="flex-shrink">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                variants={pulse}
                initial="initial"
                animate="animate"
                type="button"
                onClick={handleInterchangeLangs}
                className="rounded-full p-3 border-2 border-teal-200"
              >
                <IconArrowsExchange2 height={30} width={30} />
              </motion.button>
            </div>
            {/* ToLang */}
            <div className="flex-1">
              <Dropdown
                options={optionsToLang}
                selected={toLang}
                onChange={handleChangeToLang}
              />
            </div>
          </div>
          {/* TextAreas */}
          <div className="flex">
            <div className="flex-1 relative">
              <TextArea
                rows={20}
                placeholder="Type something..."
                className="rounded-bl-md pr-6"
                autoFocus
                value={text}
                onChange={setText}
              />
              {/* Cleaning textarea */}
              {Boolean(text) && (
                <div className="absolute top-2 right-1">
                  <button type="button" onClick={() => setText("")}>
                    <IconTrash height={20} width={20} className="opacity-70" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1 border-l border-teal-300">
              <TextArea
                rows={20}
                className="rounded-br-md"
                readonly
                value={translatedText}
                loading={isTranslating}
                onChange={setTranslatedText}
              />
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default App;
