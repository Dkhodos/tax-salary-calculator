import React from "react";
import {DEFAULT_CURRENCY_SYMBOL, DEFAULT_INPUT_SECTION_TITLE} from "../../../appConfig";
import SalaryInput from "../../../Componets/SaleryInput";
import {SalaryMessage} from "../../../models/salary";
import styles from "../styles.module.scss"
import classNames from "classnames";
import {Button} from "@material-ui/core";

interface Props {
    value: number
    onSave: (salary: number) => void
    onNew: VoidFunction

    message: SalaryMessage | undefined

    className?: string
    title?: string
}

const InputSection: React.FC<Props> = ({className, title = DEFAULT_INPUT_SECTION_TITLE, value, onNew, message, onSave}) => {
    return (
        <div className={styles.inputArea}>
            <header className={classNames(styles.headerTitle, {[styles.edit]: Boolean(message)})}>
                <h2>{title}</h2>
                {message ?
                    <small>Notice you are editing the highlighted item, click <strong>Create New</strong> or click the item to start a new input</small> : null}
                {message ? <Button className={styles.new} onClick={onNew} variant="contained" color="secondary">Create New</Button> : null}
            </header>
            <SalaryInput defaultValue={value} onSubmit={onSave}/>
            {message ? <>
                {message.taxes ?
                    <>
                        <p>You need to pay {message.taxes}{DEFAULT_CURRENCY_SYMBOL}</p>
                        <p>it leaves you with {message.final}{DEFAULT_CURRENCY_SYMBOL}</p>
                    </>
                    :
                    <p>You didn't pay any taxes, it leaves you with {message.value}{DEFAULT_CURRENCY_SYMBOL}</p>
                }
            </> : null}
        </div>
    )
}

export default InputSection