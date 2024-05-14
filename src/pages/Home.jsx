import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import InputBox from "../components/common/InputBox";
import Button from "../components/common/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  addTaskLists,
  openModel,
  removeTask,
  countTasks,
} from "../store/rootSlice";
import useLocalStorage from "../hooks/useLocalStorage";
import HomeLayout from "../components/layout/HomeLayout";
import Label from "../components/common/Label";
import UpdateModel from "../components/UpdateModel";
import ListItem from "../components/ListItem";

const Home = () => {
  const task = useSelector((state) => state.task);
  const taskLists = useSelector((state) => state.taskLists);
  const open = useSelector((state) => state.open);
  const count = useSelector((state) => state.count);

  const [newTask, setNewTask] = useState(task);
  const [selectedTask, setSelectedTask] = useState(null);
  const [status, setStatus] = useState("all");

  const [tasks, setTasks, clearTask] = useLocalStorage("tasks", []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTaskLists({ tasks: [...tasks] }));
    dispatch(countTasks({ status: status }));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTask.id !== "") {
      dispatch(addTask({ task: newTask }));
      setTasks([...tasks, newTask]);
    }
    setNewTask({ ...newTask, id: "", name: "" });
  };

  const handleEdit = (taskItem) => {
    setSelectedTask(taskItem);
    dispatch(openModel());
  };

  const handleRemove = (id) => {
    const leftTasks = taskLists.filter((task) => task.id !== id);
    setTasks([...leftTasks]);
    dispatch(removeTask({ id: id }));
  };

  const handleStatus = (taskStatus) => {
    dispatch(countTasks({ status: taskStatus }));
    setStatus(taskStatus);
  };

  return (
    <HomeLayout>
      <div
        className={`${
          open ? "blur-sm" : ""
        } w-full h-full bg-blue-200 px-8 py-4 rounded-lg flex flex-col gap-4`}
      >
        <Label className={"font-bold text-lg"}>
          {status.charAt(0).toUpperCase() + status.slice(1) + " Tasks"}
        </Label>

        <div className="flex justify-between gap-3 items-center">
          <InputBox
            placeholder="Enter new task"
            value={newTask.name}
            onChange={(e) => {
              setNewTask({ ...newTask, id: uuidv4(), name: e.target.value });
            }}
          />
          <Button
            iconName={faPlus}
            onClick={handleSubmit}
            className={"w-8 h-8 bg-white"}
          ></Button>
        </div>

        {taskLists && status !== "all"
          ? taskLists.map(
              (taskItem) =>
                taskItem.status === status && (
                  <ListItem
                    key={taskItem.id}
                    task={taskItem}
                    handleEdit={() => handleEdit(taskItem)}
                    handleRemove={() => handleRemove(taskItem.id)}
                  />
                )
            )
          : taskLists.map((taskItem) => (
              <ListItem
                key={taskItem.id}
                task={taskItem}
                handleEdit={() => handleEdit(taskItem)}
                handleRemove={() => handleRemove(taskItem.id)}
              />
            ))}

        <Label className={"text-sm"}>Count : {count}</Label>
      </div>

      <div className="flex mt-5 bg-gray-200 px-8 py-4 rounded-lg justify-between">
        <Button onClick={() => handleStatus("all")}>All</Button>
        <Button onClick={() => handleStatus("active")}>Active</Button>
        <Button onClick={() => handleStatus("complete")}>Complete</Button>
      </div>

      {selectedTask && <UpdateModel task={selectedTask} />}
    </HomeLayout>
  );
};

export default Home;
