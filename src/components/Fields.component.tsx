import React, { useCallback, useState, useEffect } from "react";
import { UpperFloorProps, LowerFloorProps, FieldsProps } from "../interfaces/Fields.interface";
import { toHsv, toRgb } from "../utils/convert.util";
import { roundFloat } from "../utils/roundFloat.util";
import { toColor } from "../utils/toColor.util";
import { validHex } from "../utils/validate.util";

const UpperFloor = ({ color, hideHEX, onChange }: UpperFloorProps): JSX.Element => {
  const getValueHEX = useCallback(() => ({ value: color.hex, inputted: false }), [color.hex]);

  const [valueHEX, setValueHEX] = useState(getValueHEX);

  useEffect(() => {
    if (!valueHEX.inputted) {
      setValueHEX(getValueHEX);
    }
  }, [valueHEX.inputted, getValueHEX]);

  const changeHEX = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;

    if (validHex(value)) {
      if (!value.startsWith("#")) {
        value = `#${value}`;

        onChange(toColor("hex", value));
        setValueHEX({ ...valueHEX, value });
      }
      onChange(toColor("hex", value));
      setValueHEX({ ...valueHEX, value });
    }
  };

  return (
    <>
      {!hideHEX && (
        <div className="rcp-fields-element hex-element">
          <input
            className="rcp-fields-element-input"
            value={valueHEX.value}
            // pattern="/^#[0-9a-f]{3,6}$/i"
            // pattern="/^#?(?:[0-9a-f]{3}){1,2}$/i"
            onFocus={(): void => setValueHEX({ ...valueHEX, inputted: true })}
            onChange={changeHEX}
            onBlur={(): void => setValueHEX({ ...valueHEX, inputted: false })}
          />
          <label className="rcp-fields-element-label">HEX</label>
        </div>
      )}
    </>
  );
};

const LowerFloor = ({ color, hideRGB, hideHSV, alpha, onChange }: LowerFloorProps): JSX.Element => {
  const getValueRGB = useCallback(
    () => ({
      value: `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}${
        alpha && color.rgb.a !== undefined ? `, ${roundFloat(color.rgb.a, 3)}` : ""
      }`,
      inputted: false,
    }),
    [color.rgb, alpha]
  );
  const getValueHSV = useCallback(
    () => ({
      value: `${Math.round(color.hsv.h)}°, ${Math.round(color.hsv.s)}%, ${Math.round(color.hsv.v)}%${
        alpha && color.hsv.a !== undefined ? `, ${roundFloat(color.hsv.a, 3)}` : ""
      }`,
      inputted: false,
    }),
    [color.hsv, alpha]
  );

  const [valueRGB, setValueRGB] = useState(getValueRGB);
  const [valueHSV, setValueHSV] = useState(getValueHSV);

  useEffect(() => {
    if (!valueRGB.inputted) {
      setValueRGB(getValueRGB);
    }
  }, [valueRGB.inputted, getValueRGB]);

  useEffect(() => {
    if (!valueHSV.inputted) {
      setValueHSV(getValueHSV);
    }
  }, [valueHSV.inputted, getValueHSV]);

  const changeRGB = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.match(/\d+(?:\.\d+)?/g);

    if (value && (value.length === 3 || (alpha && value.length === 4))) {
      const rgb = toRgb(value);

      onChange(toColor("rgb", rgb));
    }

    setValueRGB({ ...valueRGB, value: e.target.value });
  };

  const changeHSB = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.match(/\d+(?:\.\d+)?/g);

    if (value && (value.length === 3 || (alpha && value.length === 4))) {
      const hsb = toHsv(value);

      onChange(toColor("hsv", hsb));
    }

    setValueHSV({ ...valueHSV, value: e.target.value });
  };

  return (
    <>
      {(!hideRGB || !hideHSV) && (
        <>
          {!hideRGB && (
            <div className="rcp-fields-element">
              <input
                className="rcp-fields-element-input"
                value={valueRGB.value}
                onFocus={(): void => setValueRGB({ ...valueRGB, inputted: true })}
                onChange={changeRGB}
                onBlur={(): void => setValueRGB({ ...valueRGB, inputted: false })}
              />
              <label className="rcp-fields-element-label">RGB</label>
            </div>
          )}
          {!hideHSV && (
            <div className="rcp-fields-element">
              <input
                className="rcp-fields-element-input"
                value={valueHSV.value}
                onFocus={(): void => setValueHSV({ ...valueHSV, inputted: true })}
                onChange={changeHSB}
                onBlur={(): void => setValueHSV({ ...valueHSV, inputted: false })}
              />
              <label className="rcp-fields-element-label">HSV</label>
            </div>
          )}
        </>
      )}
    </>
  );
};

export const Fields = ({ color, hideHEX, hideRGB, hideHSV, alpha, onChange }: FieldsProps): JSX.Element => {
  return (
    <>
      {(!hideHEX || !hideRGB || !hideHSV) && (
        <div className="rcp-fields">
          <LowerFloor color={color} hideRGB={hideRGB} hideHSV={hideHSV} alpha={alpha} onChange={onChange} />
          <UpperFloor color={color} hideHEX={hideHEX} onChange={onChange} />
        </div>
      )}
    </>
  );
};
