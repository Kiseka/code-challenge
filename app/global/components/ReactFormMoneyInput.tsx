import { useState, ChangeEvent, useEffect } from 'react';
import { UseFormRegister } from 'react-hook-form';

type NumberInputProps = {
  className: string,
  disabled?: boolean,
  placeholder?: string,
  register: UseFormRegister<any>,
  inputName:string
};

const ReactFormMoneyInput = ({ className, disabled = false, placeholder = "", register ,inputName}: NumberInputProps) => {
  return (
    <input
      {...register(inputName)}
      placeholder={placeholder}
      disabled={disabled} className={className} type="text" />
  );
};

export default ReactFormMoneyInput;
