import React from "react";
import classNames from "classnames/bind";
import styles from "./Chip.scss";

const cx = classNames.bind(styles);

type TChipProps = {
  title?: string;
  value?: any;
  isActive?: boolean;
  imageSrc?: string;
  onClick?: (param?: any) => void;
};

function Chip({ title, value, isActive, imageSrc, onClick }: TChipProps) {
  const handleClick = (): void => {
    if (onClick) onClick(value);
  };

  return (
    <div className={cx("chip__container")}>
      <button
        title={title}
        className={cx({ on: isActive })}
        onClick={handleClick}
      >
        {imageSrc && (
          <span>
            <img src={imageSrc} alt={title} />
          </span>
        )}
        {title}
      </button>
    </div>
  );
}

export default Chip;
