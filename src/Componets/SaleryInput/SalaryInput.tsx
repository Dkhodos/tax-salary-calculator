import {InputAdornment, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {DEFAULT_CURRENCY_SYMBOL} from "../../appConfig";


interface Props {
    defaultValue: number

    onSubmit: (salary: number) => void
}

const SalaryInput: React.FC<Props> = ({defaultValue, onSubmit}) => {
    const [error, setError] = useState(false);

    const [value, setValue] = useState(String(defaultValue))
    useEffect(() => {
        setValue(defaultValue ? String(defaultValue) : "");
    }, [defaultValue])

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!value || /^[0-9]+([.][0-9]+)?$/.test(value)) {
            onSubmit(parseFloat(value))
            setError(false);
        } else {
            setError(true);
        }
    }

    const onEdit = (value: string) => {
        setValue(value);
        setError(false);
    }

    return (
        <form onSubmit={submit}>
            <TextField classes={{root: styles.input}} label={"Salary"} placeholder={"Enter Salary"}
                       onChange={event => onEdit(event.target.value)} error={error}
                       helperText={error ? "Not a Number!, please check your input" :
                           <span className={styles.helperText}>Press <strong>Enter</strong> to submit</span>}
                       autoFocus={true}
                       value={value} className={styles.wrapper} color={"secondary"} InputProps={{
                endAdornment: <InputAdornment className={styles.symbol} position="end">{DEFAULT_CURRENCY_SYMBOL}</InputAdornment>,
            }}/>
        </form>
    )
}

export default SalaryInput