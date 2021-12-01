import moment, { Moment } from 'moment';

const isoStringRegex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

export enum DATE_FORMAT {
  DATE = 'DD/MM/YYYY',
  DATE_TIME = 'DD/MM/YYYY HH:mm',
  TIME = 'HH:mm',
}

export const formatDate = (date: Date | Moment, format?: DATE_FORMAT): string => {
  const momentDate = moment.isMoment(date) ? date : moment.utc(date);
  return format ? momentDate.format(format) : momentDate.format();
};

export const isISOString = (dateString: string): boolean => Boolean(isoStringRegex.exec(dateString));
