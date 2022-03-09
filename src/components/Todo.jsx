import { useState, useEffect } from "react";
import axios from "axios";
import "./Todo.css";
export const Todo=()=>{
     const [text, setText]= useState("");
     const [todo, setTodo]= useState([]);
    const [page, setPage]= useState(1)
    //const [Toggle, setToggle] =useState(false);
     useEffect(()=>{
       getData();
        
     },[page]);

const getData=()=>{
    /*  fetch("http://localhost:3001/todos") //fetch
    //  .then((d)=> d.json())
    //  .then((res)=>{
    //   setTodo(res)
    //  });*/
    axios.get(`http://localhost:3001/todos?_page=${page}&_limit=7`).then((res)=>{ //axios
        setTodo(res.data);
    });
}


let handleDelete=(e)=>{

  axios.delete(`http://localhost:3001/todos/${e.id}`).then((res)=>{
    //console.log(res)
    getData()
  })
  .catch((err)=>{
    console.log(err)
  }); 
  
}
 
    return (
        <>
        <input type="text" placeholder="Enter todo" onChange={(e)=>setText(e.target.value)} />
        <button className="sbtn"
        onClick={()=>{
            const data= {title:text, status:false}
            axios.post("http://localhost:3001/todos", data).then((res)=>{  //use axios
                getData();
            })
            /* fetch(`http://localhost:3001/todos`, {  //use fetch
                method :"POST",
                body : JSON.stringify(data),
                headers : {
                    "content-type" : "application/json",
                },
            }).then((res)=>{
                  getData();
            });
            //setTodo(...todo,);*/

        }}>Add</button>   
            
            {todo.map((e) => {
          return(
        <div className="todobox" key={e.id}>
          
          {e.title}  {e.status ? <span>Submitted</span> : <span>Pending</span>}
          <button className="btn" onClick={()=>{
            handleDelete(e);
          }}>Delete</button> 
        
     
         
        </div>
          );

      })}

      <button className="pagebtn"
        onClick={() => {
       setPage(page-1);
        }}
      >
        Prev
      </button>

      <button className="pagebtn"
        onClick={() => {
      setPage(page+1);
        }}
      >
        Next
      </button>
            
        </>
    )
}