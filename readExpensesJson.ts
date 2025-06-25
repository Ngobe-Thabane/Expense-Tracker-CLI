import fs from 'fs';
import type { Expense } from './interfaces';

export  class ExpenseApp{
  #tasks;

  constructor(){
    const data = fs.readFileSync('./expense.json', 'utf-8');
    this.#tasks = JSON.parse(data);
  }

  getExpenses(){
    return this.#tasks.expenses as Array<Expense>;
  }

  addExpense(expense:Expense){
    this.#tasks.expenses.push(expense);
    this.writeToJSONFile();
  }

  updateExpense(id:string, description:string, amount:string){

    const task = this.getExpense(id) as Expense;
    task.description = description;
    task.amount = amount;
    this.writeToJSONFile();

  }

  deleteExpense(id:string){
    this.#tasks.expenses = this.#tasks.expenses.filter((expense:Expense)=> expense.id != id);
    this.writeToJSONFile();
    console.log(`Expense deleted successfully`)
  }

  getExpense(id :string){
    return this.#tasks.expenses.find((expense : Expense)=> {
      return expense.id === id;
    });
  }

  getExpensesSummary(){

    const total = this.#tasks.expenses.reduce((previousAmount:number, currentAmount:Expense)=>{
      return previousAmount + Number.parseInt(currentAmount.amount);
    }, 0);

    return total;
  }
  
  writeToJSONFile(){
    fs.writeFileSync('./expense.json', JSON.stringify(this.#tasks))
  }
}