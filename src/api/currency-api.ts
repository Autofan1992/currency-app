import { CurrencyCodesEnum, ExchangeRatesType } from '../types/currency-types'
import env from 'react-dotenv'

export type APIResponseType = {
    base: CurrencyCodesEnum
    rates: ExchangeRatesType
}

const BASE_URL = `https://api.apilayer.com/exchangerates_data/latest`
export const currencyCodes = Object.values(CurrencyCodesEnum)

export const getExchangeRates = async (fromCurrency: CurrencyCodesEnum): Promise<APIResponseType> => {
    const res = await fetch(`${BASE_URL}?symbols=${currencyCodes}&base=${fromCurrency}`, {
        redirect: 'follow',
        headers: {
            apikey: env.APIKEY
        }
    })

    return res.json()
}