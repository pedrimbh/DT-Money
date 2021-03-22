import Modal from 'react-modal'
import closeImg from "../assets/close.svg"
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import iconmeImg from '../assets/income.svg'
import outcomeImg from '../assets/outcome.svg'
import { FormEvent, useState } from 'react'
import { useTransactions } from '../hooks/TransactionsContext'

interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}
export function NewTransactionModal({isOpen,onRequestClose}: NewTransactionModalProps){
    const { createTransaction } = useTransactions()
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType] = useState('deposit')


    async function handleCreateNewTransaction(event:FormEvent){
        event.preventDefault()
        await createTransaction({
            title,
            amount,
            category,
            type
        })
        setTitle('')
        setCategory('')
        setAmount(0)
        setType('deposit')
        onRequestClose()

    }

    return(
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} 
        overlayClassName="react-modal-overlay"
        className="react-modal-content">
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transalçao</h2>
                <input type="text"
                placeholder="Titulo"
                value={title} 
                onChange={event => setTitle(event.target.value)} />
                <input type="number" 
                placeholder="Valor" 
                value={amount} 
                onChange={event => setAmount(Number(event.target.value))}/>
                <TransactionTypeContainer>
                    <RadioBox type="button" 
                    onClick={() =>{setType('deposit')}}
                    isActive={type === 'deposit'}
                    activeColor="green"
                    >
                        <img src={iconmeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox type="button"
                    onClick={()=>{setType('withdraw')}}
                    isActive={type === 'withdraw'}
                    activeColor="red">
                        <img src={outcomeImg} alt="Saida"/>
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input type="text" 
                placeholder="Categoria" 
                value={category}
                onChange={event => {setCategory(event.target.value)}} />
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
            </Modal>
    )
}