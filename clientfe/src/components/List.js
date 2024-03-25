import React from "react"; 
import 'boxicons';
import {default as api} from '../store/apiSlice';




/*const obj = [
    {
        name: "Savings",
        color: '#FFD700',
        
        
    },

    {
        name: "Investment",
        color: '#FFD700',
        
        
    },

    {
        name: "Expense",
        color: 'rgb(54, 162, 235)',
        
    }


]*/


export default function List() {
    const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    const [deleteTransaction] = api.useDeleteTransactionMutation();
    let Transactions;

    const handlerClick = (e) => {
        // was given before: console.log(e.target.dataset.id);
        if(!e.target.dataset.id) return 0;
        deleteTransaction({_id : e.target.dataset.id});
    }

    if(isFetching){
        Transactions = <div>Fetching</div>;

    }else if(isSuccess){
        Transactions = data.map((v,i)=><Transaction/*LabelComponent*/ key={i} category/*data*/={v} handler = {handlerClick}></Transaction /*LabelComponent>*/>);

    }else if(isError){
        Transactions = <div>Error</div>

    }


    return (
        <div className="flex flex-col py-6 gap-3">
            <h1 className="py-4 font-bold text-xl">History</h1> 
            {Transactions /*obj.map((v,i)=><Transaction key = {i} category={v}></Transaction>)*/}
        </div>
    )
}
//Line 7 just putting {Transaction()} will give an error because it is not defined.

function Transaction({category, handler}){
    if (!category) return null;
    return (
        // eslint-disable-next-line no-template-curly-in-string
        <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{borderRight:`8px solid ${category.color ?? "#e5e5e5"}`}}>
            <button className="px-3" onClick={handler}><box-icon data-id={category._id ?? ''} size="15px" color ={category.color ?? "#e5e5e5"} name="trash"></box-icon></button>
            <span className='block w-full'>{category.name ?? ''}</span>
        </div>
    )

}
