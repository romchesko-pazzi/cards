import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from "./checkbox.module.css";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}


export const Checkbox: React.FC<SuperCheckboxPropsType> = (props) => {

    const {type, onChange, onChangeChecked, className, spanClassName, children} = props;

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChangeChecked)
            onChangeChecked(e.currentTarget.checked)
        else if (onChange) {
            onChange(e);
        }
    }

    // const finalInputClassName = `${s.checkbox} ${className ? className : ''}`

    return (
        <label>
            <input
                type={"checkbox"}
                onChange={onChangeCallback}
                {...props}
            />
            {children && <span className={s.spanClassName}>{children}</span>}
        </label>
    )
}