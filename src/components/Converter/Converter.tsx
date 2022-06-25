import { FormGroup, Input, Label } from 'reactstrap'
import { ChangeEventHandler, FC } from 'react'

const Converter: FC<PropsType> = (
    {
        currencyOptions,
        selectedCurrency,
        handleSelectedCurrency,
        handleAmount,
        amount,
        isFetching
    }) => {
    return <>
        <FormGroup>
            <Label className="d-block">
                <p className='mb-1'>Currency</p>
                <Input
                    disabled={isFetching}
                    value={selectedCurrency}
                    onChange={handleSelectedCurrency}
                    type="select"
                    name="currency"
                >
                    {currencyOptions.map(option => <option key={option} value={option}>{option}</option>)}
                </Input>
            </Label>
        </FormGroup>
        <FormGroup>
            <Label className="d-block">
                <p className='mb-1'>Amount</p>
                <Input
                    disabled={isFetching}
                    type="number"
                    min={0}
                    max={1000000}
                    name="amount"
                    value={amount}
                    onChange={handleAmount}
                />
            </Label>
        </FormGroup>
    </>
}

export default Converter

type PropsType = {
    isFetching: boolean
    amount: number
    handleAmount: ChangeEventHandler<HTMLInputElement>
    handleSelectedCurrency: ChangeEventHandler<HTMLInputElement>
    currencyOptions: string[]
    selectedCurrency: string | undefined
}