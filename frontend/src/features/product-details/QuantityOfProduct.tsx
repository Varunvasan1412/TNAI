import React from "react";

interface Props {
    value?: number;
    onChange?: (value: number) => void;
}

const QuantityOfProduct: React.FC<Props> = ({ value = 1, onChange }) => {
    return (
        <div className="quantity-box">
            <button
                type="button"
                className="sub"
                onClick={() => onChange?.(value > 1 ? value - 1 : value)}
            >
                <i className="fa fa-minus"></i>
            </button>

            <input
                type="number"
                value={value}
                onChange={(e) => onChange?.(Number(e.target.value) || 1)}
            />

            <button
                type="button"
                className="add"
                onClick={() => onChange?.(value + 1)}
            >
                <i className="fa fa-plus"></i>
            </button>
        </div>
    );
};

export default QuantityOfProduct;
