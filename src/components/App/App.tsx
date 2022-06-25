import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Card, Col, Container, Row } from 'reactstrap'
import Converter from '../Converter/Converter'
import { currencyCodes, getExchangeRates } from '../../api/currency-api'
import { CurrencyCodesEnum, ExchangeRatesType, SelectedCurrencyEnum } from '../../types/currency-types'
import ExchangeIcon from '../common/Icons/ExchangeIcon'
import { CountAmountMethodsEnum, countCurrencyAmount } from '../../utils'
import Preloader from '../common/Preloader/Preloader'

const App: FC = memo(() => {
    const [isFetching, setIsFetching] = useState(true)
    const [fromCurrency, setFromCurrency] = useState<CurrencyCodesEnum>(CurrencyCodesEnum.UAH)
    const [toCurrency, setToCurrency] = useState<CurrencyCodesEnum>(CurrencyCodesEnum.EUR)
    const [amount, setAmount] = useState(1)
    const [amountType, setAmountType] = useState<SelectedCurrencyEnum>(SelectedCurrencyEnum.FromCurrency)
    const [UAHExchangeRate, setUAHExchangeRate] = useState<ExchangeRatesType>({} as ExchangeRatesType)
    const [exchangeRates, setExchangeRates] = useState<ExchangeRatesType | null>(null)

    useEffect(() => {
        const fetchExchangeRate = async () => {
            const { base, rates } = await getExchangeRates(fromCurrency)

            if (fromCurrency === CurrencyCodesEnum.UAH) {
                setUAHExchangeRate(rates)
            }

            setFromCurrency(base)
            setExchangeRates(rates)
            setIsFetching(false)
        }

        fetchExchangeRate()
            .catch(console.warn)
    }, [fromCurrency])

    if (exchangeRates === null) return <Preloader/>

    let toAmount: number, fromAmount: number
    if (amountType === SelectedCurrencyEnum.FromCurrency) {
        fromAmount = amount
        toAmount = countCurrencyAmount(CountAmountMethodsEnum.Multiply, amount, exchangeRates[toCurrency])
    } else {
        toAmount = amount
        fromAmount = countCurrencyAmount(CountAmountMethodsEnum.Divide, amount, exchangeRates[toCurrency])
    }

    const handleAmount = (e: ChangeEvent<HTMLInputElement>, type: SelectedCurrencyEnum) => {
        setAmountType(type)
        setAmount(+e.target.value)
    }

    return <div className="min-vh-100 d-flex flex-column justify-content-between">
        <Header exchangeRate={UAHExchangeRate}/>
        <main>
            <section>
                <Container className="py-5">
                    <Row className="justify-content-center">
                        <Col md={10} lg={8}>
                            <Card className="py-5 px-3">
                                <h2 className="mb-4 text-center">Convert</h2>
                                <Row className="align-items-center justify-content-center">
                                    <Col md={4} lg={3}>
                                        <Converter
                                            isFetching={isFetching}
                                            amount={fromAmount}
                                            handleAmount={e => handleAmount(e, SelectedCurrencyEnum.FromCurrency)}
                                            handleSelectedCurrency={e => setFromCurrency(e.target.value as CurrencyCodesEnum)}
                                            currencyOptions={currencyCodes}
                                            selectedCurrency={fromCurrency}
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <ExchangeIcon size="50px" color="#168B48"/>
                                    </Col>
                                    <Col md={4} lg={3}>
                                        <Converter
                                            isFetching={isFetching}
                                            amount={toAmount}
                                            handleAmount={e => handleAmount(e, SelectedCurrencyEnum.ToCurrency)}
                                            handleSelectedCurrency={e => setToCurrency(e.target.value as CurrencyCodesEnum)}
                                            currencyOptions={currencyCodes}
                                            selectedCurrency={toCurrency}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
        <Footer/>
    </div>
})

export default App
