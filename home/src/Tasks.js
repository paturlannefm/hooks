import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const TASK_STORAGE_KEY = "TASK_STORAGE_KEY";

const storeTasks = (taskMap) => {
  localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(taskMap));
};

const readStoreTasks = () => {
  const tasksMap = JSON.parse(localStorage.getItem(TASK_STORAGE_KEY));

  return tasksMap ? tasksMap : { tasks: [], completedTasks: [] };
};

function Tasks() {
  const [taskText, setTaskText] = useState("");
  const storedTasks = readStoreTasks();
  const [tasks, setTasks] = useState(storedTasks.tasks);
  const [completedTasks, setCompletedTasks] = useState(
    storedTasks.completedTasks
  );

  useEffect(() => {
    storeTasks({ tasks, completedTasks });
  });

  const updateTaskText = (event) => {
    setTaskText(event.target.value);
  };

  const addTask = () => {
    setTasks([...tasks, { taskText, id: uuidv4() }]);
  };

  const completeTask = (completedTask) => {
    setCompletedTasks([...completedTasks, completedTask]);
    setTasks(tasks.filter((task) => task.id !== completedTask));
  };

  const deleteTask = (task) => {
    setCompletedTasks(completedTasks.filter((t) => t.id !== task.id));
  };

  return (
    <div>
      <h3>Tasks</h3>
      <div className="form">
        <input value={taskText} onChange={updateTaskText} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-list">
        {tasks.map((task) => {
          const { id, taskText } = task;
          return (
            <div key={id} onClick={() => completeTask(task)}>
              {taskText}
            </div>
          );
        })}
      </div>
      <div className="completed-list">
        {completedTasks.map((task) => {
          const { id, taskText } = task;
          return (
            <div key={id}>
              {taskText}{" "}
              <span onClick={() => deleteTask(task)} className="delete-task">
                x
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tasks;
