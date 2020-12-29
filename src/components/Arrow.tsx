import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import classnames from "classnames";

import styles from "./Arrow.scss";

const cx = classnames.bind(styles);

type TArrowProps = {
  isNext: boolean;
  onClick: (value: any) => void;
  value?: number;
};

function Arrow(props: TArrowProps) {
  const { isNext, onClick, value } = props;
  const handleClick = () => {
    onClick(value);
  };
  return (
    <div className={cx("arrow__container", { next: isNext })}>
      <button className={cx("arrow__button")} onClick={handleClick}>
        {!isNext ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
      </button>
    </div>
  );
}

export default Arrow;
