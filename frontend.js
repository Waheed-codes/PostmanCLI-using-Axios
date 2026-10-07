import axios from "axios";
import readline from "readline-sync";


//1)Function to create user
async function createUser(){
    try {
        const name =readline.question("Please Enter your name:")
        const email=  readline.question("Please ENter your email:")
        const password=  readline.question("please ENter your password:")
        const response= await axios.post(`http://127.0.0.1:5047/user/create-user`,{
            name,
            email,
            password,
        })
        console.log(response.data)
        
    } catch (error) {
        console.error(error)
    }
}

// 2)Function to create todo
async function createTodo(){
    try {
        const userID= readline.question("Please Enter the user id:")
        const task =readline.question("Please enter the task:")
        const response= await axios.post(`http://127.0.0.1:5047/todo/create-todo/${userID}`,{
            task,
        })
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}

//3)Function to get all users
async function getAllUsers(){
    try {
        const response= await axios.get(`http://127.0.0.1:5047/user/users`)
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}

// 4)Function to get all Todos of a specific user

async function getTodosByUser(){
    try {
        const userId = readline.question("Please Enter a user id:")
        const response= await axios.get(`http://127.0.0.1:5047/todo/getalltodos/${userId}`)
        console.log(response.data.todos)
    } catch (error) {
        console.error(error);
    }
}

// 5) Get a specific user
async function getUserById(){
    try {
        const userId= readline.question("Please Enter the user id:")
        const response= await axios.get(`http://127.0.0.1:5047/user/users/${userId}`)
        console.log(response.data)
        
    } catch (error) {
        console.error(error)
    }
}
// Function to display options
function showMenu() {
  console.log("\ Select an operation ");
  console.log("1. Create user");
  console.log("2. Create todo");
  console.log("3. Get all users");
  console.log("4. Get all todos of a specific user");
  console.log("5. Get a specific user");
  console.log("6. Exit");
}


async function main(){
    while(true){
        showMenu()
        const choice = readline.question("Enter your choice:")

        switch(choice.trim()){
            case "1":
                await createUser()
                break;
             case "2":
                await createTodo()
                break;
             case "3":
                await getAllUsers()
                break;
             case "4":
                await getTodosByUser()
                break;
             case "5":
                await getUserById()
                break;
            case "6":
                process.exit()
            default:
                console.group("Invalid Input")
        }
    }

}

main()