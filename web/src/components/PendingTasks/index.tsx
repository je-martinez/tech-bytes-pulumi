/* eslint-disable tailwindcss/no-custom-classname */

import { useEffect, useState } from 'react'

export interface Task {
  id: number
  task: string
  completed: boolean
}

const apiUrl = import.meta.env.VITE_API_URL

export default function PendingTasks() {
  const [, setIsFetching] = useState<boolean>(false)
  const [, setOnError] = useState<boolean>(false)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setIsFetching(true)
    try {
      const response = await fetch(`${apiUrl}/api/tasks`)
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      setOnError(true)
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <div className="mt-4 flex flex-col justify-center">
      <div className="z-5 relative flex w-full max-w-[300px] flex-col rounded-[20px] bg-white p-4 shadow-2xl">
        <Header />
        <TaskList tasks={tasks} />
      </div>
    </div>
  )
}

const Header = () => {
  return (
    <>
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center">
          <div className="flex size-9 animate-pulse items-center justify-center rounded-full bg-indigo-100">
            <span className="material-symbols-rounded text-brand-500 size-6">
              check_circle
            </span>
          </div>
          <h4 className="animate-pingtext-navy-700 ml-4 text-xl font-bold">
            Tasks
          </h4>
        </div>
        <button className="bg-lightPrimary text-brand-500 flex items-center rounded-lg p-2 text-xl hover:cursor-pointer hover:bg-gray-100">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            className="size-6"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
          </svg>
        </button>
      </div>
    </>
  )
}

const TaskList = ({ tasks = [] }: { tasks: Task[] }) => {
  return (
    <div className="size-full">
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task.task}
          index={index}
          completed={task.completed}
        />
      ))}
    </div>
  )
}

const Task = ({
  task,
  completed,
  index
}: {
  task: string
  index: number
  completed: boolean
}) => {
  return (
    <div
      className="mx-2 mt-2 flex items-center justify-between p-2"
      key={index}
    >
      <div className="mr-4 flex items-center justify-center gap-2">
        <input
          type="checkbox"
          disabled={true}
          className="checked:bg-brand-500 relative flex size-5 appearance-none items-center justify-center rounded-md border border-gray-300 outline-none transition hover:cursor-pointer"
          defaultChecked={completed}
        />
        <p className="text-navy-700 text-base font-bold">{task}</p>
      </div>
      <span className="material-symbols-rounded text-navy-700 size-6 cursor-pointer">
        drag_indicator
      </span>
    </div>
  )
}
