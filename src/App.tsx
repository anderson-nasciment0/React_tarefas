import { ChangeEvent, useState } from "react";
import { useTaskList } from "./reducers/taskLisk";
import adicionar from "./assets/mais.png";
import excluir from "./assets/bloquear.png";
import ordenar from "./assets/ordenar.png";
import styles from "./App.module.css";

function App() {
  const [state, dispatch] = useTaskList();
  const [taskInput, setTaskInput] = useState("");

  function adicionarTarefa() {
    if (taskInput) {
      dispatch({ type: "ADD", payload: { name: taskInput } });
      setTaskInput("");
    }
  }

  function deletarTarefa(id: string) {
    dispatch({ type: "DEL", payload: { id } });
  }

  function ordenarTarefa() {
    dispatch({ type: "ORDER" });
  }

  function inputChange(e: ChangeEvent<HTMLInputElement>) {
    setTaskInput(e.target.value);
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.add}>
          <h1>Lista de Tarefas</h1>
          <hr />
          <div className={styles.header}>
            <input
              type="text"
              value={taskInput}
              onChange={inputChange}
              placeholder="Digite a tarefa"
              maxLength={62}
              required
            />
            <img src={adicionar} onClick={adicionarTarefa} alt="" />
          </div>
          <div className={styles.list}>
            <img src={ordenar} onClick={ordenarTarefa} alt="" />
            <ul>
              {state.map((item, index) => (
                <li key={index}>
                  <input type="checkbox" />
                  <label id="task"> {item.name}</label>
                  <img
                    src={excluir}
                    onClick={() => deletarTarefa(item.id)}
                    alt=""
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
