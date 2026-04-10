import React from "react";
import Chart from "./Chart";

export default function Statistics({
    setCurrentSection, 
    transactionsList
}){
    return (<div className="stats-section">
        <div className="section-info">
            <h1 className="section-title">Граф</h1>
        </div>
        <div className="section">
            <div className="section-nav">
                <ul className="section-nav-links">
                    <li className="section-nav-links__item" onClick={()=>{setCurrentSection(0)}}>На Главную</li>
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
