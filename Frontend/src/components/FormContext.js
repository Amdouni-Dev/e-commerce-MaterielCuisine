// FormContext.js
import React, { createContext, useState, useContext } from "react";

const FormContext = createContext();

export const useFormContext = () => {
    return useContext(FormContext);
};

export const FormProvider = ({ children }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    return (
        <FormContext.Provider value={{ isSubmitted, setIsSubmitted }}>
            {children}
        </FormContext.Provider>
    );
};
