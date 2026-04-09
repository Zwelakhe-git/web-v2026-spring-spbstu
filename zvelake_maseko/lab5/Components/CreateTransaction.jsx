import React, {useState, useEffect} from "react";
import TransactionModel from "../Models/TransactionModel.js";
import Alert from "./Alert";

export default function CreateTransaction({
    prevSection,
    setCurrentSection, 
    setPrevSection,
    setTransactionsList
}){
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState(0.0);
    const [paymentMethod, setPaymentMethod] = useState('CARD');
    const [paymentStatus, setPaymentStatus] = useState('PENDING');
    const [alertMessage, setAlertMessage] = useState('Success');
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [transactionType, setTransactionType] = useState('income');
    const id = crypto.randomUUID();

    
    const save = function(e){
        e.preventDefault();
        setTransactionsList(prev => {
            const newTransaction = new TransactionModel(id, name, date, transactionType == 'income' ? amount : -amount, paymentMethod, paymentStatus);
            return [...prev, newTransaction];
        });

        setTimeout(()=>{
            setShowAlert(false);
            setPrevSection(1);
            setCurrentSection(0);
        }, 10000);
        setAlertMessage('транзакция создана Успешно');
        setAlertType('success');
        setShowAlert(true);
    }

    const close = function(){
        setPrevSection(1);
        setCurrentSection(prevSection);
    }
    
    return (<div className="transaction-create-section box">
        <div className="section-info">
            <h1 className="section-name">Создать транзакцию</h1>
        </div>
        <div className="section">
            <div className="section-nav">
                <ul className="section-nav-links">
                    <li className="section-nav-links__item" onClick={()=>{setPrevSection(1);setCurrentSection(prevSection);}}>Назад</li>
                    <li className="section-nav-links__item" onClick={()=>{setPrevSection(1);setCurrentSection(0)}}>На Главную</li>
                </ul>
            </div>
            {showAlert && <Alert message={alertMessage} type={alertType} setShowAlert={setShowAlert}/>}
            <div className="section-body">
                <form className="transaction-create-form" onSubmit={save}>
                    <div className="flex row">
                        <div className="field">
                            <label htmlFor="date">Дата<span className="required">*</span></label>
                            <input type="date" name="date" id="date" onChange={(e)=>{setDate(new Date(e.target.value))}} required/>
                        </div>
                        <div className="field">
                            <label htmlFor="name" className="label">
                                Item Name<span className="required">*</span>
                            </label>
                            <input name="name" id="name" value={name} className="form-control" onChange={(e)=>{setName(e.target.value)}} required/>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="amount" className="label">
                            Amount <span className="required">*</span>
                        </label>
                        <input type="number" min="0" name="amount" id="amount" value={amount} className="form-control" onChange={(e)=>{setAmount(e.target.value)}} required/>
                    </div>
                    <div className="payment-info flex row">
                        <div className="field">
                            <label htmlFor="payment-method">Способ оплаты <span className="required">*</span></label>
                            <select name="paymentMethod" id="payment-method" className="form-control" onChange={(e)=>{setPaymentMethod(e.target.value)}}>
                                <option value="CARD" defaultValue={true}>Карта</option>
                                <option value="ONLINE">Онлайн</option>
                                <option value="CASH">Наличные</option>
                            </select>
                        </div>
                        <div className="field">
                            <label className="label">Состояние Оплаты<span className="required">*</span></label>
                            <select name="paymentStatus" id="payment-status" className="form-control" onChange={(e)=>{setPaymentStatus(e.target.value)}}>
                                <option value="PAID" defaultValue={true}>Оплачено</option>
                                <option value="PENDING">Не Оплачено</option>
                            </select>
                        </div>
                        <div className="field">
                            <label className="label">Тип транзакции<span className="required">*</span></label>
                            <select name="trasactionType" id="trasaction-type" className="form-control" onChange={(e)=>{setTransactionType(e.target.value)}}>
                                <option value="PAID" defaultValue={true}>Доход</option>
                                <option value="PENDING">Расход</option>
                            </select>
                        </div>
                    </div>
                    <div className="spacer" style={{height: '20px'}}></div>
                    {/* buttons */}
                    <div className="form-btns">
                        <button className="save-btn" type="submit">Сохранить</button>
                        <button className="cancel-btn" type="button" onClick={close}>Отменить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}