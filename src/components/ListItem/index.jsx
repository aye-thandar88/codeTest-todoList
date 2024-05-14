import React, { useEffect, useState } from "react";
import Label from "../common/Label";
import Button from "../common/Button";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { handleCheckboxChange } from "../../store/rootSlice";
import useLocalStorage from "../../hooks/useLocalStorage";

const ListItem = ({ task, handleEdit, handleRemove }) => {

  const [isChecked, setIsChecked] = useState(task.checked);
  const dispatch = useDispatch();
  const [tasks, setTasks, clearTask] = useLocalStorage("tasks", []);
  const taskLists = useSelector((state) => state.taskLists);

  const handleCheckbox = (id) => {
    setIsChecked(!isChecked);
    dispatch(handleCheckboxChange({ id: id }));
  };

  useEffect(() => {
    setTasks([...taskLists]);
  }, [taskLists]);

  return (
    <div className="w-full flex items-center justify-between p-2 bg-white rounded-lg flex-wrap">
      <div className="flex items-center space-x-2 ">
        <input
          type="checkbox"
          id={task.id}
          className="h-4 w-4"
          checked={isChecked}
          onChange={() => handleCheckbox(task.id)}
        />
        <Label className={`${isChecked ? "line-through" : ""}`}>
          {task.name}
        </Label>
      </div>

      <div className="flex gap-2 max-sm:gap-1">
        <Button
          iconName={faPenToSquare}
          onClick={handleEdit}
          className={`${isChecked ? "hidden" : ""}`}
        ></Button>
        <Button iconName={faTrash} onClick={handleRemove}></Button>
      </div>
    </div>
  );
};

export default ListItem;
