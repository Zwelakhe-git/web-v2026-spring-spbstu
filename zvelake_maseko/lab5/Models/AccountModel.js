class AccountModel {
    constructor(full_name, created_at, balance) {
        this._full_name = full_name;
        this._created_at = created_at;
        this._balance = balance;
        this._transactionHistory = [];
    }
    updateBalance(amount) {
        this._balance += amount;
    }
    updateTransactionHistory(transaction) {
        this._transactionHistory.push(transaction);
    }
}
export default AccountModel;
