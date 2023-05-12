import { ParsedUrlQuery } from 'querystring';

//add comma to currency
export const comma = (data: number): string => {
  const number = '' + data;
  if (number.length > 3) {
    var mod = number.length % 3;
    var output = mod > 0 ? number.substring(0, mod) : '';
    for (let i = 0; i < Math.floor(number.length / 3); i++) {
      if (mod === 0 && i === 0) output += number.substring(mod + 3 * i, mod + 3 * i + 3);
      else output += '.' + number.substring(mod + 3 * i, mod + 3 * i + 3);
    }
    return output;
  } else return number;
};

//remove comma from currency
export const noComma = (number: string): number => {
  const len = number.length / 4;
  for (var i = 0; i < len; i++) {
    number = number.replace('.', '');
  }
  return parseInt(number);
};

export const setWithExpiry = (key: string, value: any, ttl = 1): void => {
  const isClient = typeof window !== 'undefined';
  if (isClient) {
    const item = {
      value: value,
      expiry: new Date().getTime() + ttl * 86400000
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
};
export const getWithExpiry = (key: string): any => {
  const isClient = typeof window !== 'undefined';
  if (isClient) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    if (new Date().getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
};

export const renderImageLink = (data: string, type: number): string => {
  // let link = data.slice(0, data.lastIndexOf('.jpg'));
  let link = data;
  switch (type) {
    case 0:
      //thumb
      link += '_s.jpg';
      break;
    case 1:
      // Small thumb for add product
      link += '_q.jpg';
      break;
    case 2:
      // medium thumb for index product
      link += '_n.jpg';
      break;
    case 3:
      // large thumb for product
      link += '.jpg';
      break;
    case 4:
      // biggest img for slide
      link += '_b.jpg';
      break;
    default:
      link += '_o.jpg';
      break;
  }
  return link;
};

export const formatDateTime = (date: string | number | Date, isTime = true): string => {
  let d = typeof date === 'object' ? date : new Date(date);
  if (isTime) {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d);
  } else {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(d);
  }
};
export const sortJSON = (arr: Array<any>, prop: string = '', asc: boolean = true): any[] => {
  arr.sort((a, b) => {
    if (asc) {
      return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
    } else {
      return a[prop] < b[prop] ? 1 : a[prop] > b[prop] ? -1 : 0;
    }
  });
  return arr;
};

export const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const convertToUrl = (name = ''): string => {
  name = name.replaceAll(' ', '-');
  name = name.replaceAll('---', '-');
  name = name.replaceAll('--', '-');
  name = name.replaceAll('?', '');
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const getIdFromUrl = (params: ParsedUrlQuery | undefined): string | number => {
  if (!params) return '';
  const url = Object.values(params as Object)[0];
  const index = url.lastIndexOf('-');
  return url.substring(index + 1, url.length);
};

export const shortDescriptionProduct = (data: string): string => {
  return data.split('\n')[0];
};
