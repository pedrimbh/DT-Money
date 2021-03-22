import React from 'react';
import ReactDOM from 'react-dom';
import {createServer, Model} from "miragejs"
import {App} from './App';

createServer({
  models: {
    transactions: Model
  },
  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freela',
          type: 'deposit',
          category:'Dev',
          amount: 6000,
          createdAt: new Date()
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 6000,
          createdAt: new Date()
        }
      ]
    })

  },
  routes(){
    this.namespace = "api";
    this.get('/transactions', () =>{
      return this.schema.all('transactions')
    })
    this.post('/transactions', (schema, req) =>{
      const data = JSON.parse(req.requestBody)
      return schema.create('transactions', data)
    })
  }
})
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

