import {useState,useEffect} from 'react';
import TaskList from '../components/TaskList.jsx';
import styles from './Home.module.css';


function Home() {
    //追加するタスクを管理するuseState
    //初期値はinputのvalueと考える
    const[newTask,setNewTask] = useState("");

    //表示するタスクを管理するuseState
    //初期値をlocalStorageから読み込む（useEffectを使わずに直接読み込み）
    const [tasks,setTasks] =useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        //三項演算子⇒条件式 ? 真の場合の値 : 偽の場合の値
        //returnが必要な理由⇒useStateの初期値には関数を渡す必要があるため
        //returnによってlocalStorageから読み込んだタスクを返して初期値とする
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    //e.target⇒イベントが発生した要素
    //e.target.value⇒イベントが発生した要素のvalue
    const handleChange = (e) => {
        setNewTask(e.target.value)
    }

    //tasksが変更されたらlocalStorageに保存する
    //setItem()⇒localStorageに保存する
    //setItem()の第一引数は保存するデータのキー、第二引数は保存するデータの値
    //stringify()⇒配列をJSON文字列に変換する
    useEffect(()=> {
        // 常にlocalStorageに保存（空配列でも保存）
        localStorage.setItem('tasks',JSON.stringify(tasks));
    },[tasks])



    
    const handleAddTask = () => {
        if(newTask.trim() !== ""){
            //tasksにnewTaskを追加する
            //追加されるタスクは{tasks:newTask, completed:false}というオブジェクトとして追加される
            setTasks([...tasks, {task:newTask, completed:false}])
            setNewTask(""); // 入力フィールドをクリア
        }
    }



    const handleDeleteTask = (index) => {
        //filterメソッドは条件に合致しない要素を削除する
        //iは現在処理中の要素のインデックス
        //_は現在処理中の要素の値（今回は使わないので_）
        //この場合は現在処理中の要素のインデックスがindexと一致しない要素を残す
        setTasks(tasks.filter((_,i) => i !== index))
    }

    //タスクの完了状態をチェックボックスで切り替える
    const handleToggleTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    }
    
    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleAddTask();
        }
    }
    
    return(
        <div className={styles.homeContainer}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>ToDo App</h1>
                <div className={styles.inputContainer}>
                    {/* onChange⇒入力が変更されたらhandleChangeを呼び出す */}
                    <input className={styles.inputBox} type="text" placeholder="タスクを入力" value={newTask} onChange={handleChange} onKeyDown={handleKeyDown}/>
                    <button className={styles.addButton} onClick={handleAddTask}>追加</button>
            </div>
            </div>
            {/* tasks.length > 0⇒タスクが1つ以上ある場合 */}
            {/* 左側がtrueの場合は右側の処理が実行される */}
            {tasks.length > 0 && (
                <div className={styles.taskList}>
                    <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} handleToggleTask={handleToggleTask}/>
                </div>
            )}
        </div>
    )
}

export default Home;
