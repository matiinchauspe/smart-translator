import { FromLang, Lang } from "@internal-types/index";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

import { SUPPORTED_LANGUAGES } from "@constants/index";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const config = new Configuration({ apiKey });
const openai = new OpenAIApi(config);

export const translate = async ({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLang;
  toLanguage: Lang;
  text: string;
}) => {
  console.log({ fromLanguage });
  console.log({ toLanguage });
  console.log({ text });
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: `You are a AI that translates text. You receive a text from the user. 
      Do not answer, just translate the text. The original language is surrounded by '{{' and '}}'. 
      You can also receive {{auto}} which means that you should detect the language. I need that you can put the detected language in this case.
      The detected language should be surrounded by '((' and '))'.   
      The language to translate to is surrounded by '[[' and ']]'.
      `,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Hola mundo {{Spanish}} [[English]]`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: `Hello world`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Como estás? {{auto}} [[English]]`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: `How are you?. ((Spanish))`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `I am fine. {{auto}} [[Italian]]`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: `Va bene. ((English))`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Como va el trabajo?. {{auto}} [[English]]`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: `How is the work going?. ((Spanish))`,
    },
  ];

  const fromCode =
    fromLanguage === "auto" ? "auto" : SUPPORTED_LANGUAGES[fromLanguage];
  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${text} {{${fromCode}}} [[${toCode}]]`,
      },
    ],
  });

  return completion.data.choices[0].message?.content;
};
