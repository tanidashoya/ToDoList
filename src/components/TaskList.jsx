import styles from './TaskList.module.css';

function TaskList(props) {

    const {
        filteredTasks,
        handleDeleteTask,
        handleToggleTask,
        handleEditTask,
        editText,
        editingTask,
        setEditText,
        handleSaveTask,
        handleEditCancel,
        // sorterdTasks
    } = props;
    

    function formatJapaneseDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 月は0始まり
        const day = date.getDate();
        return `${year}年${month}月${day}日`;
      }

    //Reactコンポーネントのreturn文
    return(
        <div className={styles.taskListContainer}>
            <ul className={styles.taskList}>
                {/* 条件 && JSX：条件がTrueのときだけJSXが実行される */}
                {/* JSXの記法（要素を（）で囲むのは）、複数行の要素や改行を含む場合は () を使うのが安全かつ可読性も高いため*/}
                {filteredTasks.length === 0 && (
                    <li className={styles.noTasks}>タスクがありません</li>
                )}
                {filteredTasks.map((task,index) => (
                    // map() メソッドの中で、各タスクごとの <li> 要素を生成するための return
                    //アロー関数の{}を()にすることでreturnを省略できる 
                    //map関数で渡されるtaskは{task:"タスク名", completed:false}というオブジェクトとして渡される
                        <li key={index} className={styles.taskItem}>
                            <input className={styles.checkbox} type="checkbox" onChange={() => handleToggleTask(task)} checked={task.completed}/>
                            {/* 編集中のタスクの場合はinput要素を表示する */}
                            {editingTask === task ? (
                                <>
                                    {/* 編集中のタスクの場合はinput要素を表示する(表示される値はeditTextの値) */}
                                    <input className={styles.editInput} type="text" value={editText} onChange={(e) => setEditText(e.target.value)}/>
                                    <button className={styles.saveButton} onClick={() => handleSaveTask(task)}>保存</button>
                                    <button className={styles.cancelButton} onClick={handleEditCancel}>キャンセル</button>
                                </>
                            ) : (
                                // {/* task.completedがtrueの場合はstyles.doneを追加する */}
                                <>

                                    <span className={`${styles.taskText} ${task.completed ? styles.done:""}`}>{task.task}</span>
                                    <button className={styles.editButton} onClick={() => handleEditTask(task)}>編集</button>
                                    <button className={styles.deleteButton} onClick={() =>{handleDeleteTask(task)}}>削除</button>
                                    
                                    {/* {task.due && ( */}
                                        <span className={styles.dueText}>
                                            {task.due ? (
                                                <>
                                                    期限:<br/> {formatJapaneseDate(task.due)}
                                                </>) : (
                                                    ""
                                                )}
                                        </span> 
                                    {/* )} */}
                                </>
                            )}
                            
                            
                        </li>
                    
                ))}
            </ul>
        </div>
    )
}

export default TaskList;