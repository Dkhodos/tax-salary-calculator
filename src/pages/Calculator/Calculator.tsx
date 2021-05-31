import React, {useEffect, useState} from "react";
import {useSalaryMessages} from "./utils";
import SalaryMessageItems from "./componets/SalaryMessageItems";
import styles from "./styles.module.scss"
import InputSection from "./componets/InputSection";
import dottedStyles from "../../utils/dottedBorder.module.css"
import classNames from "classnames";

const Calculator = () => {
    const {
        messages,
        selectedMessage,
        selectMessage,
        addMessage,
        editMessage,
        deleteMessage,
    } = useSalaryMessages()

    const [value, setValue] = useState<number>(0)
    useEffect(() => {
        if (selectedMessage) {
            setValue(messages[selectedMessage].value)
        } else {
            setValue(0);
        }
    }, [selectedMessage])

    const onAdd = (salary: number) => {
        if (selectedMessage) {
            editMessage(selectedMessage, salary);
        } else {
            addMessage(salary);
        }
    }

    return (
        <main className={classNames(styles.main, dottedStyles.dotted, dottedStyles.borderRadius)}>
            <SalaryMessageItems messages={messages} onSelect={selectMessage} selected={selectedMessage} onDelete={deleteMessage}/>
            <InputSection message={selectedMessage ? messages[selectedMessage] : undefined} value={value} onSave={onAdd} onNew={() => selectMessage("")}/>
        </main>
    )
}

export default Calculator;