import { FC } from 'react'

const ExchangeIcon: FC<PropsType> = ({ size, color }) => {
    return <svg color={color} fill="currentColor" width={size} height={size} focusable="false" viewBox="0 0 24 24"
                aria-hidden="true">
        <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path>
    </svg>
}

export default ExchangeIcon

type PropsType = {
    size: string
    color: string
}