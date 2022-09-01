import axios from 'axios';

const i18nextServices = {
  async getMultipleLanguage(lang: string) {
    const baseUrl = 'i18n';
    let returnData = { lang, resource: {} };
    const data = await axios.get<{ key: string }>(
      `${baseUrl}/${lang}/main.json`
    );
    returnData = {
      ...returnData,
      resource: {
        ...returnData.resource,
        ...data.data
      }
    };
    return { data: returnData };
  }
};

export default i18nextServices;
