import React from "react";
import TransactionCard from "./TransactionCard"

export default function TransactionsPreview({
    prevSection,
    transactionsList, 
    setCurrentSection,
    setPrevSection
}){
    const groupByDate = ()=>{}
    return (<>
    <div className="transaction-preview-section main">
        <div className="section-info">
            <h1 className="section-title">История</h1>
        </div>
        <div className="section">
            <div className="section-nav">
                <ul className="section-nav-links">
                    <li className="section-nav-links__item" onClick={()=>{setPrevSection(3);setCurrentSection(prevSection)}}>Назад</li>
                    <li className="section-nav-links__item" onClick={()=>{setPrevSection(3);setCurrentSection(0)}}>На Главную</li>
                </ul>
            </div>
            <div className="section-body">
                <div className="incomes">
                    <div className="section-info">
                        <h3>Доходы</h3>
                    </div>
                    <div className="spacer" style={{height: "15px"}}></div>
                    <div className="sub-section" style={{padding: "0px 15px"}}>
                        <div className="grid transactions">
                            {transactionsList.filter(tr => tr.amount > 0).map(tr => (<TransactionCard key={tr.id} transaction={tr}/>))}
                        </div>
                    </div>
                </div>
                <div className="expenses">
                    <div className="section-info">
                        <h3>Расходы</h3>
                    </div>
                    <div className="spacer" style={{height: "15px"}}></div>
                    <div className="sub-section" style={{padding: "0px 15px"}}>
                        <div className="grid transactions">
                            {transactionsList.filter(tr => tr.amount < 0).map(tr => (<TransactionCard key={tr.id} transaction={tr}/>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>)
}