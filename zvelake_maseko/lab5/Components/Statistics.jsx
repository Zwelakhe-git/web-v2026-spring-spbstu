import React from "react";
import Chart from "./Chart";

export default function Statistics({
    prevSection,
    setCurrentSection, 
    setPrevSection, 
    transactionsList
}){
    return (<div class="stats-section">
        <div className="section-info">
            <h1 className="section-title">Statistics</h1>
        </div>
        <div className="section">
            <div className="section-nav">
                <ul className="section-nav-links">
                    <li className="section-nav-links__item" onClick={()=>{setPrevSection(2);setCurrentSection(prevSection)}}>Назад</li>
                    <li className="section-nav-links__item" onClick={()=>{setPrevSection(2);setCurrentSection(0)}}>На Главную</li>
                </ul>
            </div>
            <div className="section-body">
                <div className="graph-box">
                    <Chart data={transactionsList}/>
                </div>
            </div>
        </div>
    </div>)
}