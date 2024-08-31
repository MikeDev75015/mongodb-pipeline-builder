import { Digit } from './digit';

export type DateUnit = 'year'
  | 'quarter'
  | 'week'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';

export type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type AbbreviatedDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type UtcOffset =
  `${'+' | '-'}${Digit}${Digit}:${'00' | '30' | '45'}`
  | `${'+' | '-'}${Digit}${Digit}${'00' | '30' | '45'}`
  | `${'+' | '-'}${Digit}${Digit}`;

export type TZIdentifier = `${string}/${string}` | 'GMT';

export type Timezone = TZIdentifier | UtcOffset;
