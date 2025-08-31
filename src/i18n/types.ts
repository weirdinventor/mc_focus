/* eslint-disable @typescript-eslint/no-explicit-any */
import fr from './fr.json';
// It's convention to import the default export as 'i18next' and named exports separately.
import  { TOptions } from 'i18next';

// This is perfect, no changes needed.
export type Translations = typeof fr;

// This is perfect, no changes needed.
export enum Languages {
  EN = 'en',
  FR = 'fr',
}

// This is perfect, no changes needed.
export type I18nKeyPath = RecursiveKeyOf<Translations>;

// --- THIS IS THE CONVERTED LINE ---
// We align this type alias with the standard 'TOptions' from the i18next library.
// This ensures consistency with the fixes we made in your i18n initialization file.
export type TextOptions = TOptions;


// --- NO CHANGES NEEDED BELOW THIS LINE ---
// This is advanced, platform-agnostic TypeScript for generating key paths.

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
> = TValue extends any[]
  ? Text
  : TValue extends object
    ? `${Text}${RecursiveKeyOfInner<TValue>}`
    : Text;