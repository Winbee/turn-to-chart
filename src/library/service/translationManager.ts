import arEG from "./locale/ar-EG.json";
import caES from "./locale/ca-ES.json";
import csCZ from "./locale/cs-CZ.json";
import daDK from "./locale/da-DK.json";
import deCH from "./locale/de-CH.json";
import deDE from "./locale/de-DE.json";
import enCA from "./locale/en-CA.json";
import enGB from "./locale/en-GB.json";
import enUS from "./locale/en-US.json";
import esES from "./locale/es-ES.json";
import esMX from "./locale/es-MX.json";
import faIR from "./locale/fa-IR.json";
import fiFI from "./locale/fi-FI.json";
import frCA from "./locale/fr-CA.json";
import frFR from "./locale/fr-FR.json";
import heIL from "./locale/he-IL.json";
import hrHR from "./locale/hr-HR.json";
import huHU from "./locale/hu-HU.json";
import itIT from "./locale/it-IT.json";
import jaJP from "./locale/ja-JP.json";
import koKR from "./locale/ko-KR.json";
import mkMK from "./locale/mk-MK.json";
import nbNO from "./locale/nb-NO.json";
import nlNL from "./locale/nl-NL.json";
import plPL from "./locale/pl-PL.json";
import ptBR from "./locale/pt-BR.json";
import ruRU from "./locale/ru-RU.json";
import svSE from "./locale/sv-SE.json";
import trTR from "./locale/tr-TR.json";
import ukUA from "./locale/uk-UA.json";
import zhCN from "./locale/zh-CN.json";
import zhTW from "./locale/zh-TW.json";

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
