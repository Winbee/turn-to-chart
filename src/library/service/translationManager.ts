import arEG from "./locale/ar-EG.json"; // Arabic (Egypt)
import caES from "./locale/ca-ES.json"; // Catalan (Spain)
import csCZ from "./locale/cs-CZ.json"; // Czech (Czech Republic)
import daDK from "./locale/da-DK.json"; // Danish (Denmark)
import deCH from "./locale/de-CH.json"; // German (Switzerland)
import deDE from "./locale/de-DE.json"; // German (Germany)
import enCA from "./locale/en-CA.json"; // English (Canada)
import enGB from "./locale/en-GB.json"; // English (United Kingdom)
import enUS from "./locale/en-US.json"; // English (United States)
import esES from "./locale/es-ES.json"; // Spanish (Spain)
import esMX from "./locale/es-MX.json"; // Spanish (Mexico)
import faIR from "./locale/fa-IR.json"; // Persian (Iran)
import fiFI from "./locale/fi-FI.json"; // Finnish (Finland)
import frCA from "./locale/fr-CA.json"; // French (Canada)
import frFR from "./locale/fr-FR.json"; // French (France)
import heIL from "./locale/he-IL.json"; // Hebrew (Israel)
import hrHR from "./locale/hr-HR.json"; // Croatian (Croatia)
import huHU from "./locale/hu-HU.json"; // Hungarian (Hungary)
import itIT from "./locale/it-IT.json"; // Italian (Italy)
import jaJP from "./locale/ja-JP.json"; // Japanese (Japan)
import koKR from "./locale/ko-KR.json"; // Korean (South Korea)
import mkMK from "./locale/mk-MK.json"; // Macedonian (Macedonia)
import nbNO from "./locale/nb-NO.json"; // Norwegian Bokmål (Norway)
import nlNL from "./locale/nl-NL.json"; // Dutch (Netherlands)
import plPL from "./locale/pl-PL.json"; // Polish (Poland)
import ptBR from "./locale/pt-BR.json"; // Portuguese (Brazil)
import ruRU from "./locale/ru-RU.json"; // Russian (Russia)
import svSE from "./locale/sv-SE.json"; // Swedish (Sweden)
import trTR from "./locale/tr-TR.json"; // Turkish (Turkey)
import ukUA from "./locale/uk-UA.json"; // Ukrainian (Ukraine)
import zhCN from "./locale/zh-CN.json"; // Chinese (China)
import zhTW from "./locale/zh-TW.json"; // Chinese (Taiwan)

export enum AvailableLocale {
  arEG = "ar-EG", // Arabic (Egypt)
  caES = "ca-ES", // Catalan (Spain)
  csCZ = "cs-CZ", // Czech (Czech Republic)
  daDK = "da-DK", // Danish (Denmark)
  deCH = "de-CH", // German (Switzerland)
  deDE = "de-DE", // German (Germany)
  enCA = "en-CA", // English (Canada)
  enGB = "en-GB", // English (United Kingdom)
  enUS = "en-US", // English (United States)
  esES = "es-ES", // Spanish (Spain)
  esMX = "es-MX", // Spanish (Mexico)
  faIR = "fa-IR", // Persian (Iran)
  fiFI = "fi-FI", // Finnish (Finland)
  frCA = "fr-CA", // French (Canada)
  frFR = "fr-FR", // French (France)
  heIL = "he-IL", // Hebrew (Israel)
  hrHR = "hr-HR", // Croatian (Croatia)
  huHU = "hu-HU", // Hungarian (Hungary)
  itIT = "it-IT", // Italian (Italy)
  jaJP = "ja-JP", // Japanese (Japan)
  koKR = "ko-KR", // Korean (South Korea)
  mkMK = "mk-MK", // Macedonian (Macedonia)
  nbNO = "nb-NO", // Norwegian Bokmål (Norway)
  nlNL = "nl-NL", // Dutch (Netherlands)
  plPL = "pl-PL", // Polish (Poland)
  ptBR = "pt-BR", // Portuguese (Brazil)
  ruRU = "ru-RU", // Russian (Russia)
  svSE = "sv-SE", // Swedish (Sweden)
  trTR = "tr-TR", // Turkish (Turkey)
  ukUA = "uk-UA", // Ukrainian (Ukraine)
  zhCN = "zh-CN", // Chinese (China)
  zhTW = "zh-TW", // Chinese (Taiwan)
}

export const getLocale = (input: string): AvailableLocale => {
  return (
    Object.values(AvailableLocale).find((item) => item === input) ??
    AvailableLocale.enGB
  );
};

export const getDateTimeLocale = (locale: AvailableLocale): any => {
  switch (locale) {
    case AvailableLocale.arEG:
      return arEG;
    case AvailableLocale.caES:
      return caES;
    case AvailableLocale.csCZ:
      return csCZ;
    case AvailableLocale.daDK:
      return daDK;
    case AvailableLocale.deCH:
      return deCH;
    case AvailableLocale.deDE:
      return deDE;
    case AvailableLocale.enCA:
      return enCA;
    case AvailableLocale.enGB:
      return enGB;
    case AvailableLocale.enUS:
      return enUS;
    case AvailableLocale.esES:
      return esES;
    case AvailableLocale.esMX:
      return esMX;
    case AvailableLocale.faIR:
      return faIR;
    case AvailableLocale.fiFI:
      return fiFI;
    case AvailableLocale.frCA:
      return frCA;
    case AvailableLocale.frFR:
      return frFR;
    case AvailableLocale.heIL:
      return heIL;
    case AvailableLocale.hrHR:
      return hrHR;
    case AvailableLocale.huHU:
      return huHU;
    case AvailableLocale.itIT:
      return itIT;
    case AvailableLocale.jaJP:
      return jaJP;
    case AvailableLocale.koKR:
      return koKR;
    case AvailableLocale.mkMK:
      return mkMK;
    case AvailableLocale.nbNO:
      return nbNO;
    case AvailableLocale.nlNL:
      return nlNL;
    case AvailableLocale.plPL:
      return plPL;
    case AvailableLocale.ptBR:
      return ptBR;
    case AvailableLocale.ruRU:
      return ruRU;
    case AvailableLocale.svSE:
      return svSE;
    case AvailableLocale.trTR:
      return trTR;
    case AvailableLocale.ukUA:
      return ukUA;
    case AvailableLocale.zhCN:
      return zhCN;
    case AvailableLocale.zhTW:
      return zhTW;
    default:
      return enGB;
  }
};
