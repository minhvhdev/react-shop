import React, { useEffect, useState } from 'react';
import { Col, Form as BForm, Row } from 'react-bootstrap';
import { Select } from 'antd';
import addressApi from 'api/addressApi';

import ghnProvince from '../../../public/statics/data/ghn-province.json';

interface Props {
  onWard: (value: string) => void;
}

interface SelectOption {
  value: string;
  label: string;
}

interface Response {
  province: SelectOption;
  district: SelectOption;
  ward: SelectOption;
  street: string;
}

const AddressForm = React.forwardRef<HTMLInputElement, Props>(({ onWard }: Props, refs) => {
  const [response, setResponse] = useState<Response>();
  const [province, setProvince] = useState<SelectOption[]>([]);
  const [district, setDistrict] = useState<SelectOption[]>([]);
  const [ward, setWard] = useState<SelectOption[]>([]);
  const [street, setStreet] = useState('');
  const [provinceOption, setProvinceOption] = useState<SelectOption>({ value: '', label: '' });
  const [districtOption, setDistrictOption] = useState<SelectOption>({ value: '', label: '' });
  const [wardOption, setWardOption] = useState<SelectOption>({ value: '', label: '' });

  const getProvince = (): SelectOption[] => {
    const options: SelectOption[] = ghnProvince.map((item) => ({
      value: item.ProvinceID.toString(),
      label: item.ProvinceName
    }));
    setProvince(options);
    return options;
  };

  const getDistrict = async (provinceCode: string): Promise<SelectOption[]> => {
    const res = await addressApi.getDistrict('province_id=' + provinceCode);
    const options: SelectOption[] = res.data.data.map((item) => ({
      value: item.DistrictID,
      label: item.DistrictName
    }));
    setDistrict(options);
    return options;
  };

  const getWard = async (districtCode: string): Promise<SelectOption[]> => {
    const res = await addressApi.getWard('district_id=' + districtCode);
    if (res.data.data) {
      const options: SelectOption[] = res.data.data.map((item) => ({
        value: item.WardCode || '',
        label: item.WardName
      }));
      setWard(options);
      return options;
    } else {
      setWard([{ value: '', label: 'Không' }]);
      return [{ value: '', label: 'Không' }];
    }
  };

  const handleProvince = (_: string, option: SelectOption | SelectOption[]) => {
    if (Array.isArray(option)) return;
    setProvinceOption(option);
    setDistrictOption({ value: '', label: '' });
    getDistrict(option.value);
    setWardOption({ value: '', label: '' });
    setWard([]);
  };

  const handleDistrict = (_: string, option: SelectOption | SelectOption[]) => {
    if (Array.isArray(option)) return;
    setDistrictOption(option);
    getWard(option.value);
    setWardOption({ value: '', label: '' });
  };

  const handleOnChangeWard = (_: string, option: SelectOption | SelectOption[]): void => {
    if (Array.isArray(option)) return;
    setWardOption(option);
    if (onWard) {
      onWard(districtOption.value);
    }
  };

  useEffect(() => {
    getProvince();
  }, []);

  useEffect(() => {
    setResponse({
      province: provinceOption,
      district: districtOption,
      ward: wardOption,
      street: street
    });
  }, [provinceOption, districtOption, wardOption, street]);

  return (
    <Row className="mb-3">
      <input ref={refs} type="hidden" value={JSON.stringify(response)} />
      <BForm.Group as={Col} xs={12} sm={6} className="mb-3">
        <BForm.Label>Tỉnh/TP</BForm.Label>
        <Select
          value={provinceOption.value ? provinceOption.value : null}
          placeholder={'Chọn'}
          className="w-100"
          size="large"
          onChange={handleProvince}
          options={province}
        />
      </BForm.Group>
      <BForm.Group as={Col} xs={12} sm={6} className="mb-3">
        <BForm.Label>Quận/Huyện</BForm.Label>
        <Select
          value={districtOption.value ? districtOption.value : null}
          placeholder={'Chọn'}
          size="large"
          className="w-100"
          onChange={handleDistrict}
          options={district}
        />
      </BForm.Group>
      <BForm.Group as={Col} xs={12} sm={6} className="mb-3 mb-sm-0">
        <BForm.Label>Phường/Xã</BForm.Label>
        <Select
          value={wardOption.value ? wardOption.value : null}
          placeholder={'Chọn'}
          className="w-100"
          size="large"
          onChange={handleOnChangeWard}
          options={ward}
        />
      </BForm.Group>
      <BForm.Group as={Col} xs={12} sm={6} controlId="formGridPassword">
        <BForm.Label>Địa chỉ nhà:*</BForm.Label>
        <BForm.Control
          defaultValue={''}
          onBlur={(evt) => setStreet(evt.target.value)}
          type="text"
          placeholder="Nhập địa chỉ của bạn"
        />
      </BForm.Group>
    </Row>
  );
});

AddressForm.displayName = 'AddressForm';
export default React.memo(AddressForm);
