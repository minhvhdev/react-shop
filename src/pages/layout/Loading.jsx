import React from "react";
import { Spinner } from "react-bootstrap";

function Loading(props) {
  const type = props.type === "inline";
  const size = type ? {size:"sm"} : null;
  return (
    <>
      <div
        className={`${
          type ? "position-absolute" : "position-fixed"
        } element--center ${props.className}`}
      >
        {(() => {
          let spinners = [];
          for (var i = 0; i < 5; i++) {
            spinners.push(
            // @ts-ignore
              <Spinner
                key={i}
                animation="grow"
                variant="primary"
                {...size}
                style={{ animationDelay: 75 * i + "ms" }}
              />
            );
          }
          return spinners;
        })()}
      </div>
    </>
  );
}

export default React.memo(Loading);
