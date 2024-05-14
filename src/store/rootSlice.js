import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    taskLists: [],
    task: {
      id: "",
      name: "",
      status: "active",
      date: Date.now(),
      checked: false,
    },
    open: false,
    isCheckd: false,
    count: 0,
  },
  reducers: {
    addTaskLists: (state, action) => {
      state.taskLists = [...action.payload.tasks];
    },
    addTask: (state, action) => {
      state.task = { ...action.payload.task };
    },
    editTask: (state, action) => {
      const taskId = action.payload.id;
      const updatedTaskName = action.payload.name;
      state.taskLists = state.taskLists.map((task) => {
        if (task.id === taskId) {
          return { ...task, name: updatedTaskName };
        }
        return task;
      });
    },
    removeTask: (state, action) => {
      const taskId = action.payload.id;
      state.taskLists = state.taskLists.filter((task) => task.id !== taskId);
    },
    openModel: (state) => {
      state.open = !state.open;
    },
    handleCheckboxChange: (state, action) => {
      state.isCheckd = true;
      const taskId = action.payload.id;
      state.taskLists = state.taskLists.map((task) => {
        if (task.id === taskId) {
          return { ...task, checked: true, status: "complete" };
        }
        return task;
      });
    },
    countTasks: (state, action) => {
      const status = action.payload.status;
      let countT = 0;

      if (status === "all") {
        countT = state.taskLists.length;
      } else {
        countT = state.taskLists.filter(
          (task) => task.status === status
        ).length;
      }

      state.count = countT;
    },
  },
});

export const {
  addTaskLists,
  addTask,
  editTask,
  removeTask,
  openModel,
  handleCheckboxChange,
  countTasks,
} = rootSlice.actions;

export const reducer = rootSlice.reducer;
