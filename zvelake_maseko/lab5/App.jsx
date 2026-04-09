import React, { useEffect, useState } from 'react';
import Statistics from './Components/Statistics.jsx';
import Index from './Components/Main.jsx'
import TransactionsPreview from './Components/TransactionsPreview.jsx';
import CreateTransaction from './Components/CreateTransaction.jsx';

import {generateRandomTransactions} from './Models/DataGenerator.js';
import {groupTransactionsByDay, groupTransactionsByMonth} from './Utils/GroupData.js'
import {prepareChartData} from './Utils/ChartData.js'


const sections = {
    0: Index,
    1: CreateTransaction,
    2: Statistics,
    3: TransactionsPreview
};

function App(){
    const [currentSection, setCurrentSection] = useState(0);
    const [prevSection, setPrevSection] = useState(currentSection);
    const [transactionsList, setTransactionsList] = useState(() => {
        let expenses = Array.from(generateRandomTransactions(10)).map(tr => {
            tr.amount *= -1;
            return tr;
        });
        return [...generateRandomTransactions(10), ...expenses];
    });

    let groupedByDay = [];
    let chartData = [];
    useEffect(()=>{
        groupedByDay = groupTransactionsByDay(transactionsList);
        chartData = prepareChartData(transactionsList);
    }, [transactionsList]);

    return (<>
    { currentSection === 0 && <Index
                                prevSection={prevSection}
                                setCurrentSection={setCurrentSection}
                                setPrevSection={setPrevSection}/>}
    { currentSection === 1 && <CreateTransaction
                                prevSection={prevSection}
                                setCurrentSection={setCurrentSection}
                                setPrevSection={setPrevSection}
                                setTransactionsList={setTransactionsList}/>}
    { currentSection === 2 && <Statistics
                                prevSection={prevSection}
                                setCurrentSection={setCurrentSection}
                                setPrevSection={setPrevSection}
                                transactionsList={transactionsList}/>}
    { currentSection === 3 && <TransactionsPreview
                                prevSection={prevSection}
                                setCurrentSection={setCurrentSection}
                                setPrevSection={setPrevSection}
                                transactionsList={transactionsList}/>}
    </>);
}

export default App;