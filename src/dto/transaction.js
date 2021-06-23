export default class TransactionDTO {
    accountNumber;
    reason;
    amount;
    destination;
    timestamp;
    status;
    /**
     * Construct a TransactionDTO
     * @param {string} accountNumber
     * @param {string} reason
     * @param {float} amount
     * @param {string} destination
     * @param {string} timestamp
     * @param {string} status
     */
    constructor(accountNumber, reason, amount, destination, timestamp, status) {
        this.accountNumber = accountNumber;
        this.reason = reason;
        this.amount = amount;
        this.destination = destination;
        this.timestamp = timestamp;
        this.status = status;
    }
}