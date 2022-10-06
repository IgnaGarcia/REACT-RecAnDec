import React, { useContext } from 'react'
import { getBalance } from '../../api/RecordService';
import { UserContext } from '../../contexts/UserContext';
import { useFetch } from '../../hooks/useFetch';

export const Balance = () => {
    const { user, saveUser } = useContext(UserContext)
    const balanceResponse = useFetch(getBalance(user))

    return (
        <>
        {
            balanceResponse.loading? "Cargando..." :
                <div>
                    {
                        balanceResponse.body.data.map(el => <div>[{el._id.year}/{el._id.month}] - Income:{el.income}({el.countIncome}) - Expense:{el.expense}({el.countExpense})</div>)
                    }
                </div>
        }
        </>
    )
}
