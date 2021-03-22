import {GlobalStyle} from './styles/global'
import Modal from 'react-modal'
import {Header} from './components/Header'
import {Dashboard} from './components/Dashboard/index'
import { useState } from 'react'
import {NewTransactionModal} from './NewTransactionModal/index'
import {TransactionsProvider} from '../src/hooks/TransactionsContext'
Modal.setAppElement('#root')
export function App() {
  
  const [isNewTransactionModalOpne,setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal(){
      setIsNewTransactionModalOpen(true)
  }
  function handleClosenNewTransactionModal(){
      setIsNewTransactionModalOpen(false)
  }
  return (
  <TransactionsProvider>
    <Header onOnpenNewTransactionModal={handleOpenNewTransactionModal}/>
    <Dashboard/>
    <NewTransactionModal isOpen={isNewTransactionModalOpne} onRequestClose={handleClosenNewTransactionModal}/>
    <GlobalStyle/>
  </TransactionsProvider>
)
}

