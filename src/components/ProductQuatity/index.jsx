import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";

const InputNumerType = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
  -moz-appearance: textfield;
 /* // Firefox  */
`;
const ProductQuatity = (
  { className, max = 10, step = 1, min = 1, defaultValue, ...inputProps },
  ref
) => {
  const [currentQuatity, setCurrentQuatity] = useState(defaultValue ?? 1);
  //   console.log("🚀stock---->", max);
  const increment = () => {
    const value = _modifyNumberValue(Number(currentQuatity) + Number(step));
    setCurrentQuatity(value);
    console.log('🚀1---->', 1);
    console.log('🚀value---->',currentQuatity );
  };
  const decrement = () => {
    const value = _modifyNumberValue(Number(currentQuatity) - Number(step));
    setCurrentQuatity(value);
    // console.log('🚀2---->', 2);
  };
  useImperativeHandle(ref, () => {
    return {
      value: currentQuatity,
      reset: () => {
        setCurrentQuatity(defaultValue ?? 1);
      },
    };
  });

  const _modifyNumberValue = (value) => {
    if (value > max) {
      return max;
    } else if (value < min) {
      return min;
    } else {
      return value;
    }
  };

  return (
    <div className="input-group  input-spinner">
      <div className="input-group-prepend">
        <button
          style={{ minWidth: 26 }}
          className="btn btn-decrement btn-spinner"
          onClick={decrement}
        >
          <i className="icon-minus" />
        </button>
      </div>
      <InputNumerType
        type="number"
        // style={{ textAlign: "center" }}
        className="form-control "
        value={currentQuatity}
        max={max}
        {...inputProps}
      />
      <div className="input-group-append">
        <button
          style={{ minWidth: 26 }}
          className="btn btn-increment btn-spinner"
         
          onClick={increment}
        >
          <i className="icon-plus" />
        </button>
      </div>
    </div>
  );
};

export default forwardRef(ProductQuatity);
