import React, {useState} from "react";


function FunctionsList({setCurrentSection}){
    return(<>
    <div className="functions grid">
        <div className="func-item" id="create" onClick={()=>{setCurrentSection(1)}}>
            <div className="border abs"></div>
            <div className="icon-box">
                <i className="fa-solid fa-plus icon"></i>
            </div>
        </div>
        <div className="func-item" id="display-stats" onClick={()=>{setCurrentSection(2)}}>
            <div className="border abs"></div>
            <div className="icon-box">
                <i class="fa-solid fa-chart-area"></i>
            </div>
        </div>
        <div className="func-item" id="preview-transactions" onClick={()=>{setCurrentSection(3)}}>
            <div className="border abs"></div>
            <div className="icon-box">
                <i className="fa-solid fa-eye icon"></i>
            </div>
        </div>
    </div>
    </>)
}


export default function Index({
    prevSection, 
    setCurrentSection, setPrevSection
}){
    const [appName, setAppName] = useState('Budget');
    
    return (<div className="main-section">
        <div className="section-info app-name">
            <h1 className="section-title">{appName}</h1>
        </div>
        <div className="section">
            <div className="section-nav">
                <ul className="section-nav-links">
                    <li className="section-nav-links__item" onClick={()=>{setPrevSection(0);setCurrentSection(prevSection)}}>Назад</li>
                    <li className="section-nav-links__item" onClick={()=>{setPrevSection(0);setCurrentSection(0)}}>На Главную</li>
                </ul>
            </div>
            <div className="section-body">
                <div className="functions box">
                    <FunctionsList setCurrentSection={setCurrentSection}/>
                </div>
            </div>
        </div>
    </div>)
}