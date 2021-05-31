import {useState} from "react";
import {SalaryMessage, SalaryMessages} from "../../models/salary";
import {SALARY_TABLE, TO_FIXED_DEFAULT} from "../../appConfig";

const generateID = (function* () {
    let id = 0;
    while (true) {
        yield String(id++);
    }
})()

const getSalaryMessage = (value: number): SalaryMessage | null => {
    let taxes = 0;
    let salary = value;

    for (const key in SALARY_TABLE) {
        const [min, max] = getMinMax(key)
        const range = max - min;

        if (max === -1) {
            taxes += (salary) * SALARY_TABLE[key]
        } else if (salary >= range) {
            taxes += range * SALARY_TABLE[key]
        } else {
            taxes += salary * SALARY_TABLE[key]
            break; // reached limit
        }

        salary -= range;
    }

    return {
        value,
        taxes: parseFloat((taxes).toFixed(TO_FIXED_DEFAULT)),
        final: parseFloat((value - taxes).toFixed(TO_FIXED_DEFAULT))
    }
}

const getMinMax = (range: string) => {
    if (range.includes("+")) {
        return [parseFloat(range.split("+")[0]), -1];
    } else {
        const [min, max] = range.split("-");

        return [parseFloat(min), parseFloat(max)];
    }
}

export const useSalaryMessages = () => {
    const [messages, setMessages] = useState<SalaryMessages>({});
    const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

    const addMessage = (value: number) => {
        if (!value) {
            return;
        }

        const key = generateID.next().value;

        const message = getSalaryMessage(value);
        if (message) {
            setMessages({[key]: message, ...messages});
            setSelectedMessage(key);
        }
    }

    const editMessage = (id: string, value: number) => {
        const message = getSalaryMessage(value);
        if (message) {
            setMessages({...messages, [id]: message});
            setSelectedMessage(id);
        }
    }

    const deleteMessage = (id: string) => {
        const newMessage = {...messages}

        delete newMessage[id];

        setMessages(newMessage);
        if (selectedMessage === id) {
            setSelectedMessage(null);
        }
    }

    const selectMessage = (id: string) => {
        if (!id || selectedMessage === id) {
            setSelectedMessage(null);
        } else {
            setSelectedMessage(id);
        }
    }

    return {messages, selectedMessage, selectMessage, addMessage, editMessage, deleteMessage};
}