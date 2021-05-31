import React from "react";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Tooltip} from "@material-ui/core";
import classNames from "classnames/bind";
import styles from "./styles.module.scss"
import {AttachMoney, Delete} from "@material-ui/icons";
import {SalaryMessage} from "../../models/salary";
import {DEFAULT_CURRENCY_SYMBOL} from "../../appConfig";

interface Props {
    message: SalaryMessage

    onSelect: VoidFunction
    onDelete: VoidFunction

    selected?: boolean
}

const SalaryMessageItem: React.FC<Props> = ({message, selected = false, onSelect, onDelete}) => {
    const costMessage = message.taxes ? `, cost you ${message.taxes}${DEFAULT_CURRENCY_SYMBOL}` : ""
    const text = `Starts at ${message.value}${DEFAULT_CURRENCY_SYMBOL}, ends at ${message.final}${DEFAULT_CURRENCY_SYMBOL}${costMessage}`

    const deleteMessage = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.stopPropagation()
        onDelete();
    }

    return (
        <ListItem className={classNames(styles.message, {[styles.selected]: selected}, "animate__animated animate__fadeIn")} onClick={onSelect}>
            <ListItemAvatar>
                <Avatar className={styles.avatar}>
                    <AttachMoney className={styles.money}/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={message.value + DEFAULT_CURRENCY_SYMBOL} secondary={text} classes={{secondary: styles.secondary, primary: styles.primary}}/>
            <Tooltip title="Delete item" aria-label="delete">
                <Delete className={styles.delete} onClick={deleteMessage}/>
            </Tooltip>
        </ListItem>
    )
}

export default SalaryMessageItem;