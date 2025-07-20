import styles from './TaskList.module.css';

function TaskList(props) {

    const {tasks,handleDeleteTask,handleToggleTask} = props;
    
    //Reactコンポーネントのreturn文
    return(
        <div className={styles.taskListContainer}>
            <ul className={styles.taskList}>
                {tasks.map((task,index) => (
                    // map() メソッドの中で、各タスクごとの <li> 要素を生成するための return
                    //アロー関数の{}を()にすることでreturnを省略できる 
                    //map関数で渡されるtaskは{task:"タスク名", completed:false}というオブジェクトとして渡される
                        <li key={index} className={styles.taskItem}>
                            <input className={styles.checkbox} type="checkbox" onChange={() => handleToggleTask(index)} checked={task.completed}/>
                            <span className={styles.taskText}>{task.task}</span>
                            <button className={styles.deleteButton} onClick={() =>{handleDeleteTask(index)}}>削除</button>
                        </li>
                    
                ))}
            </ul>
        </div>
    )
}

export default TaskList;