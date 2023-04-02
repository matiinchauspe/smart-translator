export const makeOptionsFromLangSelection = (fromObject: object) => {
  const options = [];

  for (const [key, value] of Object.entries(fromObject)) {
    options.push({
      value: key,
      label: value,
    });
  }

  return options;
};
