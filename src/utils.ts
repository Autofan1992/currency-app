export enum CountAmountMethodsEnum {
    Divide,
    Multiply
}

export const countCurrencyAmount = (method: CountAmountMethodsEnum, a: number, r: number): number => {
    if (method === CountAmountMethodsEnum.Multiply) {
        return +(a * r).toFixed(3)
    } else {
        return +(a / r).toFixed(3)
    }
}