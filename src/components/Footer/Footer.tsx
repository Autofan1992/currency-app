import { Container } from 'reactstrap'

const date = new Date()

const Footer = () => {
    return <footer className="text-center">
        <Container className="py-3">
            <p>©{date.getFullYear()} Created by Mykola Gordiy</p>
        </Container>
    </footer>
}

export default Footer