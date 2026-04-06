"use strict";
import {Event} from "./event.js";
import {getList, renderEventsCard, setList} from "./index.js";

function setMessage(message,element) {
    const span = document.getElementById(element);
    span.style.display = 'block';
    span.innerText = message;
    setTimeout(() => {
        span.classList.add('show');

    }, 10)

    setTimeout(()=>{
        span.classList.remove('show');
        span.style.display = "none";

    },2000)
}

function addEvent(){
    const form = document.getElementById("addEventForm");
    const formData = new FormData(form);

    const title =  formData.get("eventTitle");
    const id = +formData.get("eventId");
    const date = formData.get("eventDate");

    getList()
        .then(res => {
            if(res.find(curEvent => curEvent.id === +id)){
                setMessage("Событие с таким ID уже существует","messageSpan");
            }
            else {
                const event = new Event(id,title,[],new Date(date))
                res.push(event);
                renderEventsCard(res)
                setMessage("Событие успешно добавлено","messageSpan");
                return setList(res);

            }
        })
        .then(res => console.log(res));
}

function deleteEvent(button){
    const cardToRemove =  +button.closest(".event-card").id;

    getList()
        .then(res => {
            const newList = res.filter(event => event.id !== cardToRemove);
            renderEventsCard(newList);
            return setList(newList);
        })
        .then(res => console.log(res))
        .catch(error => console.log(error));
}

window.deleteEvent = deleteEvent;
window.addEvent = addEvent;