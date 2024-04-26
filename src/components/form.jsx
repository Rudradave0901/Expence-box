import React from 'react'
import './styles/style.css'
import { useState, useEffect } from 'react';

const Form = () => {

    const [name, setName] = useState('');
    const [expense, setExpense] = useState('');
    const [divide, setDivide] = useState('');
    const [expensesList, setExpensesList] = useState([]);

    // Load saved expenses from localStorage on component mount
    useEffect(() => {
        const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        setExpensesList(savedExpenses);
    }, []);

    // Save expenses list to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expensesList));
    }, [expensesList]);

    function handleSubmit(e) {
        e.preventDefault();
        if (name && expense && divide && !isNaN(expense) && !isNaN(divide) && divide !== 0) {
            const newExpense = {
                name: name,
                expense: parseFloat(expense),
                divide: parseFloat(divide),
                answer: parseFloat(expense) / parseFloat(divide)
            };
            setExpensesList([...expensesList, newExpense]);
            // Clear form inputs after submitting
            setName('');
            setExpense('');
            setDivide('');
        }
    }

  return (
    <>
        {/* Expenses Section Start */}
        <section className="expenses-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-content-wrap">
                                <h1 className="section-title">Expence Box</h1>
                                <form action="#" id='myform' onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12">
                                            <input type="text" className="form-control" placeholder='Write Your Name' value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="col-12">
                                            <input type="number" className="form-control" placeholder='Write Your Expense' value={expense} onChange={(e) => setExpense(e.target.value)} />
                                        </div>
                                        <div className="col-12">
                                            <input type="number" className="form-control" placeholder='Write How much divide' value={divide} onChange={(e) => setDivide(e.target.value)} />
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary">Add Expense</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <h2>Expenses List : </h2>
                            <ul>
                                {expensesList.map((expense, index) => (
                                    <li key={index} className='text-start list-unstyled'>
                                        <h5 className='d-inline-block'>Name:</h5> {expense.name} <br /> 
                                        <h5 className='d-inline-block'>Expense:</h5> rupee : {expense.expense.toFixed(2)},  <br /> 
                                        <h5 className='d-inline-block'>Divide:</h5> {expense.divide},  <br /> 
                                        <h5 className='d-inline-block'>Answer:</h5> rupee : {expense.answer.toFixed(2)} <br /> <hr /><br />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        {/* Expenses Section End */}
    </>
  )
}

export default Form