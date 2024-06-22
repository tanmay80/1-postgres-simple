import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    const insertQuery=`INSERT INTO todos (user_id,title,description) VALUES ($1,$2,$3)
                       RETURNING id,title,description,done`;
    const values=[userId,title,description];
    const result= await client.query(insertQuery,values);
    // console.log(result);
    return result.rows[0];
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    const updateQuery=`UPDATE todos SET done = $1 WHERE id = $2 
                        RETURNING title,description,done,id`;
    const values=[true,todoId];
    const result=await client.query(updateQuery,values);
    // console.log(result);
    return result.rows[0]
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
        const getQuery="SELECT * FROM todos WHERE user_Id = $1"
        const values=[userId];
        const result=await client.query(getQuery, values);
        // console.log(result);
        return result.rows;
    }