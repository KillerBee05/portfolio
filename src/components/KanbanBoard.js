import { useState } from 'react'

const KanbanBoard = () => {
  const [stagesNames, setStagesNames] = useState(['Backlog', 'To Do', 'Ongoing', 'Done'])
  const [tasks, setTasks] = useState([
    { name: '1', stage: 0 },
    { name: '2', stage: 0 },])
  const [newTask, setNewTask] = useState('')

  const handleChange = (e) => {
    setNewTask(e.target.value)
  }

  const addTask = () => {
    tasks.push({name:newTask, stage:0})
    setNewTask('')
  }

  const goBack = (task, index) => {
    let newData = []
    let currentStage = task.stage
    var moveBack = currentStage - 1
    if(currentStage === 0){
     var moveBack = currentStage
    }
    for (var index in tasks) {
      if (tasks[index].name == task.name) {
         tasks[index].stage = moveBack;
         break;
      }
    }
    newData.push(...tasks)
    setTasks(newData)
  }

  const goForward = (task, index) => {
    let newData = []
    let currentStage = task.stage
    var moveFoward = currentStage + 1
    if(currentStage === 3){
     var moveFoward = currentStage
    }
    for (var index in tasks) {
      if (tasks[index].name == task.name) {
         tasks[index].stage = moveFoward;
         break;
      }
    }

    newData.push(...tasks)
    setTasks(newData)
  }

  const deleteTask = (removetask, index) => {
    setTasks(tasks.slice(0, index).concat(tasks.slice(index + 1, tasks.length)))
  }

  let stagesTasks = [];
  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  }
  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }

  return(
    <div>
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input" value={newTask} onChange={(e)=>handleChange(e)}/>
        <button type="submit" className="ml-30" data-testid="create-task-button" onClick={addTask}>Create task</button>
      </section>

      <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
              return (
                  <div className="card outlined ml-20 mt-0" key={`${i}`}>
                      <div className="card-text">
                          <h4>{stagesNames[i]}</h4>
                          <ul className="styled mt-50" data-testid={`stage-${i}`}>
                              {tasks.map((task, index) => {
                                  return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                    <div className="li-content layout-row justify-content-between align-items-center">
                                      <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                      <div className="icons">
                                        <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`} onClick={() =>  goBack(task, index)}>
                                          <i className="material-icons">arrow_back</i>
                                        </button>
                                        <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`} onClick={() => goForward(task, index)}>
                                          <i className="material-icons">arrow_forward</i>
                                        </button>
                                        <button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`} onClick={() => deleteTask(task, index)}>
                                          <i className="material-icons">delete</i>
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                              })}
                          </ul>
                      </div>
                  </div>
              )
          })}
      </div>
    </div>
    </div>
  )
}

export default KanbanBoard
