import AddressApi from "api/AddressApi";
import Loading from "layout/Loading";
import NullPage from "layout/NullPage";
import React, { createRef, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { GoLocation, GoPlus, GoTrashcan } from "react-icons/go";
import { useSelector } from "react-redux";
import { removeAddress, saveAddress, setDefault } from "redux/slice/addressSlice";
import store from "redux/store";
import AddressForm from "./Form/AddressForm";

function AddressTab(props) {
  const address = useSelector((state) => state.address);
  const [show, setShow] = useState(false);
  const [addr, setAddr] = useState({});
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState("");
  const addrForm = useRef(null);
  const elRefs = React.useRef([]);
  if (address.data) {
    elRefs.current = Array(address.data.length)
      .fill()
      .map((_, i) => elRefs.current[i] || createRef());
  }
  const handleCloseModal = () => {
    setError(false);
    setShow(false);
    setAddr({});
    setId(0);
    setName("");
    setLoading("");
  };
  const handleClick = (evt, index) => {
    setId(elRefs.current[index].current.getAttribute("data-id"));
    setName(elRefs.current[index].current.getAttribute("data-name"));
    setShow(true);
    setAddr(address.data[index]);
  };
  const handleRemove = (evt, index) => {
    evt.stopPropagation();
    const element = elRefs.current[index].current;
    const id = element.getAttribute("data-id");
    store.dispatch(removeAddress(id));
    AddressApi.removeAddress({ id });
  };
  const handleSetDefault = (evt, index) => {
    evt.stopPropagation();
    const element = elRefs.current[index].current;
    const id = element.getAttribute("data-id");
    store.dispatch(setDefault(id));
    AddressApi.setDefault({ id });
  };
  const handleSubmit = () => {
    const addressObj = JSON.parse(addrForm.current.value);
    const pCode = addressObj.province.value;
    const dCode = addressObj.district.value;
    const wCode = addressObj.ward.value;
    const street = addressObj.street;
    if (pCode && dCode && wCode && street !== "" && name !== "") {
      setError(false);
      setLoading("loading");
      const addressStr = `${street} - ${addressObj.ward.label} - ${addressObj.district.label} - ${addressObj.province.label}`;
      const request = {
        id,
        name,
        provinceCode: pCode,
        districtCode: dCode,
        wardCode: wCode,
        street,
        addressStr,
      };
      AddressApi.saveAddress(request)
        .then((res) => {
          store.dispatch(saveAddress(res));
          setId(0);
          setName("");
          setLoading("");
          setShow(false);
        })
        .catch((res) => {
          setLoading("");
        });
    } else {
      setError(true);
    }
  };
  return (
    <div className="position-relative">
      {address.status === "loading" ? (
        <Loading type="inline" />
      ) : address.data && address.data.length > 0 ? (
        address.data.map((item, i) => {
          return (
            <div
              data-id={item.id}
              data-name={item.name}
              key={i}
              onClick={(evt) => handleClick(evt, i)}
              ref={elRefs.current[i]}
              className="flex-column flex-md-row address__item"
            >
              {item.mainAddress ? (
                <Button variant="primary disabled py-0 position-absolute">
                  Mặc định
                </Button>
              ) : (
                <Button
                  variant="outline-primary py-0 position-absolute"
                  onClick={(evt) => handleSetDefault(evt, i)}
                >
                  Đặt làm mặc định
                </Button>
              )}
              <div className="mt-5 fw--6">
                <GoLocation className="icon" /> {item.name}
              </div>
              <div className="mt-3 mt-md-5">{item.addressStr}</div>

              {item.mainAddress?null:<Button
                variant="outline-danger py-0"
                onClick={(evt) => handleRemove(evt, i)}
                className="close-button"
              >
                <GoTrashcan />
              </Button>}
            </div>
          );
        })
      ) : (
        <NullPage />
      )}
      <div className="d-flex justify-content-center">
        <Button variant="outline-primary mt-3" onClick={() => setShow(true)}>
          Thêm địa chỉ <GoPlus className="icon" />
        </Button>
      </div>
      <Modal backdrop="static" show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm địa chỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <div className="position-relative text-center text-primary">
              {loading === "loading" ? (
                <Loading type="inline" />
              ) : loading === "" ? null : (
                loading
              )}
            </div>
            <Form.Label>Tên ghi nhớ</Form.Label>
            <Form.Control
              type="text"
              onBlur={(evt) => setName(evt.target.value)}
              defaultValue={name}
              placeholder="vd: Nhà, Công ty"
            />
          </Form.Group>
          <AddressForm ref={addrForm} address={addr} />
          {error ? (
            <Form.Text className="text-danger">
              Vui lòng nhập đầy đủ các trường
            </Form.Text>
          ) : null}
          <div className="d-flex justify-content-center">
            <Button onClick={handleSubmit} className="px-5 mt-3">
              {id ? "Cập nhật" : "Thêm địa chỉ"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddressTab;
