import React from "react";

const CustomInput = (props) => {
    const { type, label, i_id, i_class, name, val, onChng, onBlr, accept } = props;

    if (type === "file") {
        return (
            <div className="form-floating mt-3">
                <input
                    type={type}
                    className={`form-control ${i_class}`}
                    id={i_id}
                    name={name}
                    accept={accept} // Ajoutez l'attribut d'acceptation ici
                    onChange={onChng}
                    onBlur={onBlr}
                />
                <label htmlFor={label}>{label}</label>
            </div>
        );
    }

    return (
        <div className="form-floating mt-3">
            <input
                type={type}
                className={`form-control ${i_class}`}
                id={i_id}
                placeholder={label}
                name={name}
                value={val}
                onChange={onChng}
                onBlur={onBlr}
            />
            <label htmlFor={label}>{label}</label>
        </div>
    );
};

export default CustomInput;
