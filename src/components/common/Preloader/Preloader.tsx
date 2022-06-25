import { Spinner } from 'reactstrap'
import React from 'react'

const Preloader = () => {
    return <div className="w-100 min-vh-100 bg-white d-flex align-items-center justify-content-center">
        <Spinner/>
    </div>
}

export default Preloader