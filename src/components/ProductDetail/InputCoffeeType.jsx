import PropTypes from "prop-types";
import React from "react";

InputCoffeeType.propTypes = {
  type: PropTypes.string.isRequired,
  handleChangeType: PropTypes.func.isRequired,
};
function InputCoffeeType(props) {
  const type = props.type;
  const handleChangeType = props.handleChangeType;
  return (
    <>
      <div className="product__type">
        <label>Chọn loại: </label>
        <span
          onClick={handleChangeType}
          type-coffee="Bột"
          className={`a type ${type === "Bột" ? "active" : ""}`}
        >
          <i className="icon-attribute">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
          <span className="select-type">Bột</span>
        </span>
        <span
          onClick={handleChangeType}
          type-coffee="Hạt"
          className={`a type ${type === "Hạt" ? "active" : ""}`}
        >
          <i className="icon-attribute">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
          <span className="select-type">Hạt</span>
        </span>
      </div>
      <input type="hidden" name="type" value={type} />
    </>
  );
}

export default React.memo(InputCoffeeType);
