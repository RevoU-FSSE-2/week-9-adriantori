//transaction data
interface Transaction {
    id: number;
    user_id: number;
    type: string;
    amount: number;
}

const transactions: Transaction[] = [
    { id: 1, user_id: 1, type: "income", amount: 100000}
]

export default transactions;