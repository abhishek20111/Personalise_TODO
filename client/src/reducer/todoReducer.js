import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../helper/fetch2";


const initialState = []


export const createTodo = createAsyncThunk(
    'createTodo',
    async(body)=>{
        const result = await fetch2('/createtodo', body);
        return result;
    }
    
)

export const fetchTodo = createAsyncThunk(
    'fetchTodos',
    async()=>{
        const result = await fetch3('/gettodo', "get");
        return result;
    }
    
)

export const deleteTodo = createAsyncThunk(
    'fetchTodo',
    async(id)=>{
        const result = await fetch3(`/remove/${id}`, "delete");
        return result;
    }
    
)


const todoReducer = createSlice({
    name:"todo",
    initialState:initialState,
    reducers:{

    },
    extraReducers:{
        [createTodo.fulfilled]:(state,{payload:{message}})=>{
            if(message) state.push(message) //push id, todo, todoBy
        },
        [fetchTodo.fulfilled]:(state,{payload:{message}})=>{
          return message  
        },
        [deleteTodo.fulfilled]:(state,{payload:{message}})=>{
          const removeTods = state.filter(item=>{
            return item._id != message._id
          })
          return removeTods
        },
    }
})

export default todoReducer.reducer;