import { Command } from 'commander';
import { ExpenseApp } from './readExpensesJson';

const program = new Command();
const expenses = new ExpenseApp();

program.name('Expense Tracker')
  .description("This is a simple expense tracker application to manage your finances.")
  .version('0.0.1');

program.command('add')
  .option('--description <string>')
  .option('--amount <string>')
  .action((option)=>{
    addExpense(option.description, option.amount);
  })

program.command('summary')
  .description('view a summary of all expenses')
  .action(()=>{
  console.log(`# Total expenses: $${expenses.getExpensesSummary()}`);
});

program.command('delete')
  .description('delete an expense')
  .option('--id <string>', 'expense id')
  .action((option)=>{
    if(option.id){
      expenses.deleteExpense(option.id);
    }
    else{
      console.log('# ID missing ');
    }
  })

program.command('list')
  .description('view all expenses')
  .action(()=>{

  console.log(`# ID\t\tDate\t\t\tDescription\t\tAmount`);

  expenses.getExpenses().forEach((expense)=>{
    console.log(`# ${expense.id}\t\t${expense.date}\t\t${expense.description}\t\t\t${expense.amount}`);
  })
})


function addExpense(description:string, amount:string){
  
  if(!description || !amount){
    console.log('# Missing Info');
  }
  else{

    const expenseAmount = Number.parseInt(amount);
    
      if(expenseAmount < 0){
        console.log('# Amount cannot be negative');
      }
      else if(!Number.isNaN(expenseAmount)) {

        const id = `${Date.now() + Math.random()}`.substring(10, 13);
        const date = new Date().toDateString();

        expenses.addExpense({id:id, date:date, description:description, amount:`${expenseAmount}`});
        console.log(`# Expense added successfully (ID: ${id})`);
      }
      else{
        console.log('# Invalid amount')
      }
    }
  }

program.parse();