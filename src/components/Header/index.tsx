import LogoImg from '../../assets/logo.svg'
import {Container, Content} from './styles'

interface HeaderProps {
    onOnpenNewTransactionModal: () => void
}
export function Header({onOnpenNewTransactionModal}: HeaderProps){
    return(
        <Container>
            <Content>
            <img src={LogoImg} alt="dt money" />
            <button type="button" onClick={onOnpenNewTransactionModal}>
                Nova transação
            </button>
           
            </Content>
        </Container>
    )
}