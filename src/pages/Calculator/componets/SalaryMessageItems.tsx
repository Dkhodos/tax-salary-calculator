import {SalaryMessages} from "../../../models/salary";
import React from "react";
import SalaryMessageItem from "../../../Componets/SalaryMessage";
import {List} from "@material-ui/core";
import styles from "../styles.module.scss";
import scrollBarStyles from "../../../utils/scrollBar.module.css"
import classNames from "classnames";
import {DEFAULT_NO__DATA_TO_DISPLAY} from "../../../appConfig";

interface Props {
    messages: SalaryMessages

    onSelect: (id: string) => void
    onDelete: (id: string) => void
    selected: string | null
}

const SalaryMessageItems: React.FC<Props> = ({messages, onSelect, selected, onDelete}) => {
    const messageList = Object.entries(messages);

    return (
        <div className={styles.messages}>
                {
                    messageList.length > 0 ? <List className={classNames(styles.list, scrollBarStyles.scrollBar)}>
                            {
                                messageList.map(([id, message]) => {
                                    return <SalaryMessageItem message={message} key={id} selected={Boolean(selected && id === selected)}
                                                              onSelect={() => onSelect(id)} onDelete={() => onDelete(id)}/>
                                })
                            }
                        </List>
                        :
                        <p>
                            {DEFAULT_NO__DATA_TO_DISPLAY}
                        </p>
                }
        </div>
    )
}

export default SalaryMessageItems