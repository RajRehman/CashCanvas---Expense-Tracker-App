import React from 'react'
import {default as api} from '../store/apiSlice';
import {getLabels} from '../helper/helper';

/*const obj = [
    {
        type: "Savings",
        color: '#FFD700',
        percent: 45 
        
    },

    {
        type: "Investment",
        color: '#FFD700',
        percent: 20
        
    },

    {
        type: "Expense",
        color: 'rgb(54, 162, 235)',
        percent: 10
    }


]*/

export default function Labels() {
    
    const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    let Transactions;


    if(isFetching){
        Transactions = <div>Fetching</div>;

    }else if(isSuccess){

        Transactions = getLabels(data, 'type').map((v,i)=><LabelComponent key={i} data={v}></LabelComponent>)

    }else if(isError){
        Transactions = <div>Error</div>

    }

    return (
        <>
        {Transactions}
        </>
    )
}
//L43-The nullish coalescing ( ?? ) operator is a logical operator that 
//returns its right-hand side operand when its left-hand side operand 
//is null or undefined , and otherwise returns its left-hand side operand.
//L44- if data type not defined, then return empty string
function LabelComponent({data}){
    if (!data) return <></>;
    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div className='w-2 h-2 rounded py-3' style={{background:data.color ??'#FFD700'}}></div>
                <h3 className='text-md'>{data.type ?? ''}</h3> 
            </div>
            <h3 className='font-bold'>{Math.round(data.percent) ?? 0}%</h3>
        </div>

    )
}