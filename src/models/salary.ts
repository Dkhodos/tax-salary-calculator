export interface SalaryMessage {
    value: number

    taxes: number
    final: number
}

export interface SalaryMessages {
    [key: string]: SalaryMessage
}