import { useCallback, useEffect, useState } from "react";
import "./App.css";
import AddNewTask from "./components/addNewTask/addNew";

// Define the Todo type
interface Todo {
  id: number;
  title: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const [buckets, setBuckets] = useState([
    {
      Heading: "NEW TASKS",
    },
    {
      Heading: "COMPLETED TASKS",
    },
    {
      Heading: "ON HOLD TASKS",
    },
    {
      Heading: "TEAM COMMENTS",
    },
  ]);

  // Fetch all todos from the API
  const fetchTodos = async (): Promise<void> => {
    try {
      const res = await fetch("http://localhost:7000");
      if (res.status === 200) {
        const data: Todo[] = await res.json();
        setTodos(data);
      } else {
        console.error("Failed to fetch todos with status:", res.status);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

 

  // Delete a todo by ID via the API
  const deleteTodo = async (id: number): Promise<void> => {
    try {
      const res = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        alert(`Hit /todos/${id} (DELETE) endpoint`);
        fetchTodos(); // Refresh the list of todos after deletion
      } else {
        console.error("Failed to delete todo with status:", res.status);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch the list of todos when the component mounts
  }, []);

  const [addNewTaks, setAddNewTask] = useState(false);

  const handleAddNewTask = useCallback(() => {
    setAddNewTask(!addNewTaks);
  }, [addNewTaks]);

  return (
    <div className="mainCont">
      <div className="header"></div>
      <div className="content">
        <div className="leftSidePanel">
          <ul>
            <li>ACTIONS</li>
            <li id="clickable" onClick={handleAddNewTask}>
             {addNewTaks ? "Cancel" : "Add New Task"}
            </li>
          </ul>
        </div>
        <div className="taskView">
          {buckets?.map((val, ind) => {
            return (
              <>
                <div className="currentTask" key={ind}>
                  <div className="columnHeader">{val?.Heading}</div>
                  {val?.Heading === "NEW TASKS" ? (
                    todos?.map((v, ind) => {
                      return (
                        <div className="newTaskCard" key={ind}>
                          <div className="cardicon">
                            <span id="iconActual"></span>
                            <div className="details">
                              <p>{v?.title}</p>
                            </div>
                          </div>
                          <div className="cardStatus"></div>
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </>
            );
          })}
          {addNewTaks ? <AddNewTask /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default App;
