import styles from './Memo.module.css';
import { useState } from 'react';



function Memo() {
    const [memoTitle,setMemoTitle] = useState("");
    const [memoList,setMemoList] = useState([]);
    const [memoContent,setMemoContent] = useState("");
    //メモ作成中かどうかを管理する
    const [isCreateing,setIsCreateing] = useState(false);

    //メモを保存する
    const handleSave = () => {
        if (!memoTitle.trim()) {
            alert("タイトルを入力してください");
            return;
        }
        if (!memoContent.trim()) {
            alert("内容を入力してください");
            return;
        }
        //新しいメモを作成する（newMemoにオブジェクトとして格納）
        const newMemo = {
            id:Date.now(),
            title:memoTitle,
            content:memoContent
        }
        //memoListに新しいメモを追加する(配列に追加)
        setMemoList([...memoList,newMemo]);
        setMemoTitle("");
        setMemoContent("");
        setIsCreateing(false);
    }
     

    return(
        <div className={styles.memo}>
            <div className={styles.memoContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Memo</h1>
                    <div className={styles.inputContainer}>
                        <input className={styles.titleInput} type="text" placeholder="タイトルを入力" value={memoTitle} onChange={(e)=>setMemoTitle(e.target.value)}/>
                        <button className={styles.createButton} onClick={()=>setIsCreateing(true)}>作成</button>
                        {/* <Link to="/memoitem" className={styles.createButton}>作成</Link> */}
                    </div>
                </div>
            </div>
            {isCreateing && (
                <div className={styles.createContainer}>
                    <input className={styles.titleInput} type="text" placeholder="タイトルを入力" value={memoTitle} onChange={(e)=>setMemoTitle(e.target.value)}/>
                    <textarea className={styles.contentInput} rows="10" cols="50" placeholder="内容を入力" value={memoContent} onChange={(e)=>setMemoContent(e.target.value)}/>
                    <button className={styles.saveButton} onClick={handleSave}>保存</button>
                </div>
            )}
        </div>
    )
}

export default Memo;