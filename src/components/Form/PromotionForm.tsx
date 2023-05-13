import { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { removePromotion } from 'redux/slice/orderSlice';
import store, { RootState } from 'redux/store';

const PromotionForm: React.FC = () => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');
  const promotion = useSelector((state: RootState) => state.order).data.promotionCode;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) =>
    setCode(evt.target.value);

  const handleCheckPromotion = () => {
    // setStatus('loading');
    // orderApi
    //   .checkPromotion({ code })
    //   .then((res) => {
    //     setStatus('idle');
    //     store.dispatch(addPromotion(res));
    //   })
    //   .catch(() => {
    //     setStatus('error');
    //   });
  };

  const handleRemovePromotion = () => {
    setStatus('');
    store.dispatch(removePromotion());
  };

  return (
    <Spin spinning={status === 'loading'}>
      {promotion ? (
        <Col>
          <div className="promotion--success">
            <div className="promotion__item">{promotion.code}</div>
            <div className="promotion__item">-{promotion.discount}%</div>
            <div className="promotion__item" onClick={handleRemovePromotion}>
              <BsTrash />
            </div>
          </div>
        </Col>
      ) : (
        <>
          <Form.Group as={Col} xs={7} sm={8}>
            <Form.Control
              type="text"
              className={code ? 'text-uppercase' : ''}
              placeholder="Mã giảm giá"
              onChange={handleChange}
            />
            <Form.Text className="text-danger">
              {status === 'error' ? 'Mã không tồn tại hoặc đã hết lượt sử dụng!' : null}
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} xs={5} sm={4}>
            <Button className="w-100" onClick={handleCheckPromotion}>
              Sử dụng
            </Button>
          </Form.Group>
        </>
      )}
    </Spin>
  );
};

export default PromotionForm;
