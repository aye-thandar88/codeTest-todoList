import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask, openModel } from "../../store/rootSlice";
import InputBox from "../common/InputBox";
import Button from "../common/Button";
import useLocalStorage from "../../hooks/useLocalStorage";

const UpdateModel = ({ task }) => {
  const open = useSelector((state) => state.open);
  const [updateTask, setUpdateTask] = useState(task);
  const taskLists = useSelector((state) => state.taskLists);
  const dispatch = useDispatch();
  const [tasks, setTasks, clearTask] = useLocalStorage("tasks", []);

  useEffect(() => {
    setUpdateTask(task);
  }, [task]);

  const handleUpdate = () => {
    dispatch(editTask({ id: updateTask.id, ...updateTask }));
    dispatch(openModel());
  };

  useEffect(() => {
    setTasks([...taskLists]);
  }, [taskLists]);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center ${
        open ? "" : "hidden"
      }`}
    >
      <div className="w-80 h-40 flex flex-col gap-5 p-4 justify-center items-center rounded-lg bg-gray-400">
        <InputBox
          value={updateTask.name}
          onChange={(e) =>
            setUpdateTask({ ...updateTask, name: e.target.value })
          }
        />
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </div>
  );
};

export default UpdateModel;
