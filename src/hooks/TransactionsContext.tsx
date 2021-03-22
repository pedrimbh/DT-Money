import {createContext, useEffect, useState, ReactNode, useContext} from 'react'
import { api } from '../services/api'

interface Transaction {
    id: number;
    title: string;
    amount: number;
    category: string;
    type:string;
    createdAt: string;
}
// interface TransactionInput {
//     title: string;
//     amount: number;
//     category: string;
//     type:string;
// }

type TransactionInput = Omit<Transaction,'id'| 'createdAt'>;

interface TransactionsProviderProps {
    children:ReactNode;
}
interface TransactionsCOntextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) =>Promise<void>;
}
const TransactionsContext = createContext<TransactionsCOntextData>({} as TransactionsCOntextData)

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('/transactions')
        .then( response => setTransactions(response.data.transactions))
    },[])
   async function createTransaction(transactionInput: TransactionInput){
        
      const response = await api.post('/transactions',{
          ...transactionInput,
            createdAt: new Date()
        })
      const transactionData = response.data.transactions
      setTransactions([
          ...transactions,
          transactionData
      ])
    }
    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
                {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext)
    return context
}