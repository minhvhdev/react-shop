import { EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, EMAIL_USER_ID } from '@constants';
import emailjs from 'emailjs-com';
import { formatDateTime } from './data-processing.help';
import { IOrder } from '@types';

export const sendEmail = (data: any, callbacks: IEmailCallbacks<any>) => {
  const params: IEmailParams = {
    fromDate: '',
    message: ''
  };
  params.fromDate = formatDateTime(new Date(), false);
  params.message = callbacks.genMessage(data);

  emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, params, EMAIL_USER_ID).then(
    (response) => {
      console.log(response);
      callbacks.onSuccess();
    },
    (error) => {
      console.error(error.text);
      callbacks.onError();
    }
  );
};

export const genTemplateOrderInformationEmail = (data: IOrder): string => {
  return `
  Tên người đặt:  ${data.fullName}
  Số điện thoại:  ${data.phone}
  Địa chỉ nhận:   ${data.address}
  Đơn hàng: ${data.orderItems.map(
    (item) => `
    Sản phẩm: ${item.product.name}
    Số lượng: ${item.quantity}
    ${item.type ? `Loại:    ${item.type}` : ''}
    Giá:      ${item.product.price}
    -------------------------------------------
  `
  )}
  `;
};
