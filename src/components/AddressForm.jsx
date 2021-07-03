import AddressApi from "api/AddressApi";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Form as BForm,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Select, { components } from "react-select";

function AddressForm(props, ref) {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [provinceCode, setProvinceCode] = useState(0);
  const [districtCode, setDistrictCode] = useState(0);
  //   const [wardCode, setWardCode] = useState(0);
  const getProvince = async () => {
    const res = await AddressApi.getProvince();
    setProvince(
      res.data.map((item) => ({
        value: item.ProvinceID,
        label: item.ProvinceName,
      }))
    );
  };
  const getDistrict = async (provinceCode) => {
    const res = await AddressApi.getDistrict("province_id=" + provinceCode);
    setDistrict(
      res.data.data.map((item) => ({
        value: item.DistrictID,
        label: item.DistrictName,
      }))
    );
  };
  const getWard = async (districtCode) => {
    const res = await AddressApi.getWard("district_id=" + provinceCode);
    setWard(
      res.data.data.map((item) => ({
        value: item.WardID,
        label: item.WardName,
      }))
    );
  };
  useEffect(() => {
    if (districtCode === 0) {
      getProvince();
    }
    if (provinceCode !== 0) {
      getDistrict(provinceCode);
    }
    if (districtCode !== 0) {
      getWard(districtCode);
    }
  }, [provinceCode, districtCode]);
  return (
    <Row className="mb-3">
      {/* <input type="hidden" value={} /> */}
      <BForm.Group as={Col} xs={12} sm={6} className="mb-3">
        <BForm.Label>Tỉnh/TP</BForm.Label>
        <Select
          placeholder={"Chọn"}
          className="w-100"
          onChange={(data) => setProvinceCode(data.value)}
          styles={{
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? "#008248" : "white",
              "&:hover": {
                backgroundColor: "#0082487e",
              },
            }),
          }}
          options={province}
        />
      </BForm.Group>
      <BForm.Group as={Col} xs={12} sm={6} className="mb-3">
        <BForm.Label>Quận/Huyện</BForm.Label>
        <Select
          placeholder={"Chọn"}
          className="w-100"
          onChange={(data) => setDistrictCode(data.value)}
          components={{NoOptionsMessage}}
          styles={{
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? "#008248" : "white",
              "&:hover": {
                backgroundColor: "#0082487e",
              },
            }),
          }}
          options={district}
        />
      </BForm.Group>
      <BForm.Group as={Col} xs={12} sm={6} className="mb-3 mb-sm-0">
        <BForm.Label>Phường/Xã</BForm.Label>
        <Select
          placeholder={"Chọn"}
          className="w-100"
          onChange={(data) => setDistrictCode(data.value)}
          components={{NoOptionsMessage}}
          styles={{
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? "#008248" : "white",
              "&:hover": {
                backgroundColor: "#0082487e",
              },
            }),
          }}
          options={ward}
        />
      </BForm.Group>
      <BForm.Group as={Col} xs={12} sm={6} controlId="formGridPassword">
        <BForm.Label>Địa chỉ nhà:*</BForm.Label>
        <BForm.Control type="text" placeholder="Nhập địa chỉ nhận hàng" />
      </BForm.Group>
    </Row>
  );
}
const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span></span>
    </components.NoOptionsMessage>
  );
};
export default React.memo(React.forwardRef(AddressForm));
