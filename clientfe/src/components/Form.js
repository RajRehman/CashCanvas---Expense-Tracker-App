import React from 'react'
//L9-13, 20-24 Textboxes
//L14-18 Dropdown
//after this I downloaded react-hook-form. learn more about it.
import { useForm } from 'react-hook-form';
import List from './List';
import { default as api } from '../store/apiSlice';

export default function Form() {

    const { register, handleSubmit, resetField } = useForm();
    const [addTransaction] = api.useAddTransactionMutation();

    const onSubmit = async (data) => {
        if(!data) return {};
        await addTransaction(data).unwrap();
        //console.log(data);
        resetField('name');
        resetField('amount');
    }


    return (
        <div className='form max-w-sm mx-auto w-96'>
           <h1 className='font-bold pb-4 text-xl'>Transaction</h1> 
           <form id='form' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-4'>
                    <div className='input-group'>
                        <input type="text" {...register('name')} placeholder='Salary, House Rent, SIP' className='form-input'>

                        </input>
                    </div>
                    <select className='form-input' {...register('type')}>
                        <option value="Investment">Investment</option>
                        <option value="Expense">Expense</option>
                        <option value="Savings">Savings</option>
                    </select>
                    <div className='input-group'>
                        <input type="text" {...register('amount')} placeholder='Amount' className='form-input'>

                        </input>
                    </div>
                    <div className="submit-btn">
                        <button className='border py-2 text-white bg-indigo-500 w-full'>Make Transaction</button>
                    </div>
                </div>

           </form>

           <List></List>
        </div>
    )
}