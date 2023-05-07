import addressApi from "api/addressApi";
import React, { useEffect, useState } from "react";
import { Col, Form as BForm, Row } from "react-bootstrap";
import Select, { components } from "react-select";

function AddressForm(props, refs) {
  const address = props.address;
  const handleOnWard = props.onWard;
  const handleOnChangeWard = (data) => {
    setWardOption(data);
    if (handleOnWard) {
      handleOnWard(districtOption.value);
    }
  };
  const [response, setResponse] = useState({});
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [street, setStreet] = useState(address ? address.street : "");
  const [provinceOption, setProvinceOption] = useState({ value: 0, label: "" });
  const [districtOption, setDistrictOption] = useState({ value: 0, label: "" });
  const [wardOption, setWardOption] = useState({ value: 0, label: "" });

  const getProvince = () => {
    const ghnProvince = require("../../../public/statics/json/ghn-province.json");
    const options = ghnProvince.map((item) => ({
      value: item.ProvinceID,
      label: item.ProvinceName,
    }));
    setProvince(options);
    return options;
  };
  const getDistrict = async (provinceCode) => {
    const res = await addressApi.getDistrict("province_id=" + provinceCode);
    const options = res.data.data.map((item) => ({
      value: item.DistrictID,
      label: item.DistrictName,
    }));
    await setDistrict(options);
    return options;
  };
  const getWard = async (districtCode) => {
    const res = await addressApi.getWard("district_id=" + districtCode);
    if (res.data.data) {
      const options = res.data.data.map((item) => ({
        value: +item.WardCode || -1,
        label: item.WardName,
      }));
      setWard(options);
      return options;
    } else {
      setWard([{ value: -1, label: "Không" }]);
    }
  };
  const handleProvince = (data) => {
    setProvinceOption(data);
    setDistrictOption({ value: 0, label: "" });
    getDistrict(data.value);
    setWardOption({ value: 0, label: "" });
    setWard([]);
  };
  const handleDistrict = (data) => {
    setDistrictOption(data);
    getWard(data.value);
    setWardOption({ value: 0, label: "" });
  };

  useEffect(() => {
    const pOption = getProvince();
    const runEffect = async () => {
      const pValue = address.provinceCode;
      const dValue = address.districtCode;
      const wValue = address.wardCode;
      const dOption = await getDistrict(pValue);
      const wOption = await getWard(dValue);
      setProvinceOption({
        value: pValue,
        label: { ...pOption.filter((option) => option.value === pValue)[0] }
          .label,
      });
      setDistrictOption({
        value: dValue,
        label: { ...dOption.filter((option) => option.value === dValue)[0] }
          .label,
      });
      if (wOption) {
        setWardOption({
          value: wValue,
          label: { ...wOption.filter((option) => option.value === wValue)[0] }
            .label,
        });
      } else {
        setWardOption({
          value: -1,
          label: "Không",
        });
      }
    };
    if (address.provinceCode) {
      runEffect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  useEffect(() => {
    setResponse({
      province: provinceOption,
      district: districtOption,
      ward: wardOption,
      street: street,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceOption, districtOption, wardOption, street]);
  return (
    <Row className="mb-3">
      <input ref={refs} type="hidden" value={JSON.stringify(response)} />
      <BForm.Group as={Col} xs={12} sm={6} className="mb-3">
        <BForm.Label>Tỉnh/TP</BForm.Label>
        <Select
          value={provinceOption.value ? provinceOption : null}
          placeholder={"Chọn"}
          className="w-100"
          onChange={handleProvince}
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
          value={districtOption.value ? districtOption : null}
          placeholder={"Chọn"}
          className="w-100"
          onChange={handleDistrict}
          components={{ NoOptionsMessage }}
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
          value={wardOption.value ? wardOption : null}
          placeholder={"Chọn"}
          className="w-100"
          onChange={handleOnChangeWard}
          components={{ NoOptionsMessage }}
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
        <BForm.Control
          defaultValue={address ? address.street : ""}
          onBlur={(evt) => setStreet(evt.target.value)}
          type="text"
          placeholder="Nhập địa chỉ của bạn"
        />
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
