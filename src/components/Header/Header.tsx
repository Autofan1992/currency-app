import { Col, Container, Row } from 'reactstrap'
import { CurrencyCodesEnum, ExchangeRatesType } from '../../types/currency-types'
import React, { FC, memo } from 'react'
import { CountAmountMethodsEnum, countCurrencyAmount } from '../../utils'

const Header: FC<PropsType> = memo(({ exchangeRate }) => {
    const EURtoUAH = countCurrencyAmount(CountAmountMethodsEnum.Divide, 1, exchangeRate[CurrencyCodesEnum.EUR])
    const USDtoUAH = countCurrencyAmount(CountAmountMethodsEnum.Divide, 1, exchangeRate[CurrencyCodesEnum.USD])

    return <header className="py-3">
        <Container>
            <h1 className='mb-2'>Currency converter</h1>
            <Row className='fw-bold'>
                <Col xs="auto">1 USD to UAH {USDtoUAH.toFixed(2)}</Col>
                <Col xs="auto">1 EUR to UAH {EURtoUAH.toFixed(2)}</Col>
            </Row>
        </Container>
    </header>
})

export default Header

type PropsType = {
    exchangeRate: ExchangeRatesType
}