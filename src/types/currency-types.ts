export type ExchangeRatesType = {
    [key in CurrencyCodesEnum]: number
}

export enum CurrencyCodesEnum {
    UAH = 'UAH',
    USD = 'USD',
    EUR = 'EUR'
}

export enum SelectedCurrencyEnum {
    ToCurrency,
    FromCurrency
}