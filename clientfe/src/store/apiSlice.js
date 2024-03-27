import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseURI = process.env.NODE_ENV === 'production' ? 'https://secure-reaches-58010-009d965c3ff3.herokuapp.com/' : 'http://localhost:8080'; // heroku:https://secure-reaches-58010-009d965c3ff3.herokuapp.com, now new part is : process.env.NODE_ENV === 'production' ? 'https://secure-reaches-58010-009d965c3ff3.herokuapp.com/' :

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: baseURI}),
    endpoints: builder => ({

        //get categories
        getCategories: builder.query({
            //get: 'http://localhost:8080/api/categories'
            query: () => '/api/categories', //changed from ./api/categories
            providesTags: ['categories']
        }),

        //get labels
        getLabels: builder.query({
            //get: 'http://localhost:8080/api/labels'
            query: () => '/api/labels',
            providesTags: ['transaction'] 
        }),

        // add new transaction
        addTransaction: builder.mutation({
            query: (initialTransaction) => ({
                //post: 'http://localhost:8080/api/labels'
                url: '/api/transaction', //should it be transactions?
                method: 'POST',
                body: initialTransaction
            }),
            invalidatesTags: ['transaction']

        }),

        //delete record
        deleteTransaction: builder.mutation({
            query: recordId => ({
                //delete: 'http://localhost:8080/api/labels'
                url: '/api/transaction',
                method: "DELETE",
                body: recordId
            }),
            invalidatesTags: ['transaction']
        })

    })
})

export default apiSlice;