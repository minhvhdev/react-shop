import { EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, EMAIL_USER_ID } from '@constants';
import emailjs from '@emailjs/browser';
import { IEmailCallbacks, IEmailParams, IOrder } from '@types';

import { formatDateTime } from './data-processing.help';

let emailJsInitialized = false;

const ensureEmailJsInitialized = () => {
  if (emailJsInitialized) {
    return;
  }

  emailjs.init({
    publicKey: EMAIL_USER_ID,
    blockHeadless: false
  });
  emailJsInitialized = true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendEmail = async (data: unknown, callbacks: IEmailCallbacks<any>) => {
  const params: IEmailParams = {
    fromDate: '',
    message: ''
  };
  params.fromDate = formatDateTime(new Date(), false);
  params.message = callbacks.genMessage(data);

  try {
    ensureEmailJsInitialized();
    await emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, params);
    callbacks.onSuccess();
  } catch (error) {
    console.error('EmailJS send failed:', error);
    callbacks.onError();
  }
};

export const genTemplateOrderInformationEmail = (data: IOrder): string => {
  return `
  Tên người đặt:  ${data.fullName}
  Số điện thoại:  ${data.phone}
  Địa chỉ nhận:   ${data.address}
  Phí Ship:       ${data.shippingFee}
  Đơn hàng: ${data.orderItems
    .map(
      (item) => `
    Sản phẩm: ${item.product.name}
    Số lượng: ${item.quantity}
    ${item.type ? ` Loại:    ${item.type}` : ''}
    Giá:      ${item.product.price}
    -------------------------------------------
  `
    )
    .join('\n')}
  `;
};
