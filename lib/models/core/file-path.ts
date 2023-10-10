import { LowercaseLetter, UppercaseLetter } from './letter';

type LetterOnly = LowercaseLetter | UppercaseLetter;

export type FilePath = `$${LetterOnly}${string}`;
