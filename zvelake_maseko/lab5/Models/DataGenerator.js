import TransactionModel from './TransactionModel.js'; // Если экспортированы отдельно
// Функция генерации случайной даты за последние 30 дней
function randomDate(daysBack = 30) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
    return date;
}
// Функция генерации случайной суммы (от 10 до 5000, с копейками)
function randomAmount() {
    return Number((Math.random() * 4990 + 10).toFixed(2));
}
// Функция генерации случайного имени (для демонстрации)
function randomName() {
    const names = [
        'Магазин продуктов', 'Кафе', 'Ресторан', 'Аптека', 'Такси',
        'Коммунальные услуги', 'Интернет', 'Мобильная связь',
        'Кинотеатр', 'Спортзал', 'Одежда', 'Электроника',
        'Авиабилеты', 'Отель', 'Бензин', 'Супермаркет'
    ];
    return names[Math.floor(Math.random() * names.length)];
}
// Функция генерации случайного метода оплаты
function randomPaymentMethod() {
    const methods = ["CARD" /* PaymentMethod.CARD */, "ONLINE" /* PaymentMethod.ONLINE */, "CASH" /* PaymentMethod.CASH */];
    return methods[Math.floor(Math.random() * methods.length)];
}
// Функция генерации случайного статуса (с весами: чаще PAID)
function randomStatus() {
    const rand = Math.random();
    if (rand < 0.7)
        return "PAID" /* PaymentStatus.PAID */; // 70% оплачено
    if (rand < 0.85)
        return "PENDING" /* PaymentStatus.PENDING */; // 15% в ожидании
    return "CANCELLED" /* PaymentStatus.CANCELLED */; // 15% отменено
}
// ГЛАВНАЯ ФУНКЦИЯ: генерирует массив транзакций
function generateRandomTransactions(count) {
    const transactions = [];
    for (let i = 0; i < count; i++) {
        // Вариант 1: с crypto.randomUUID() (встроенный)
        const id = crypto.randomUUID();
        // Вариант 2: с простым числовым ID (раскомментировать если нужно)
        // const id = i + 1;
        // Вариант 3: с timestamp + random
        // const id = Date.now() + Math.floor(Math.random() * 1000);
        const transaction = new TransactionModel(id, // если id строка, нужно изменить тип в модели на string | number
        randomName(), randomDate(30), // за последние 30 дней
        randomAmount(), randomPaymentMethod(), randomStatus());
        transactions.push(transaction);
    }
    return transactions;
}
export { generateRandomTransactions };
