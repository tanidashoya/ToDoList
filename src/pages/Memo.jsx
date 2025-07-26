import styles from './Memo.module.css';
import { useState,useEffect } from 'react';
import MemoList from '../components/MemoList.jsx';



function Memo() {
    //メモのタイトルを管理するuseState
    const [memoTitle,setMemoTitle] = useState("");

    //メモリストを管理するuseState
    //初期値をlocalStorageから読み込む
    const [memoList,setMemoList] = useState(()=>{
        const storedMemoList = localStorage.getItem("memoList");
        return storedMemoList ? JSON.parse(storedMemoList) : [];
    });

    //メモの内容を管理するuseState
    const [memoContent,setMemoContent] = useState("");

    //メモ作成中かどうかを管理する
    const [isCreateing,setIsCreateing] = useState(false);

    //メモがクリックされたら、そのメモの内容を表示する
    // const handleMemoClick = (memo) => {
    //     setMemoTitle(memo.title);
    //     setMemoContent(memo.content);
    //     setIsEditing(true);
    // }

    //メモ作成画面でメモを保存する
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

    //メモを削除するボタン
    const handleDelete = (memo) => {
        setMemoList(memoList.filter((m)=>m !== memo));
    }

    //メモの作成をキャンセルする（作成画面で使う）
    const handleCancel = () => {
        setIsCreateing(false);
        setMemoTitle("");
        setMemoContent("");
    }

    //メモの内容をlocalstorageに保存する
    useEffect(()=>{
        localStorage.setItem("memoList",JSON.stringify(memoList));
    },[memoList])

    return(
        <div className={styles.memo}>
            <div className={styles.memoContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Memo</h1>
                    <div className={styles.inputContainer}>
                        <button className={styles.createButton} onClick={()=>setIsCreateing(true)}>作成</button>
                    </div>
                </div>
            </div>
            
            {/* 作成モードのウィンドウ */}
            {isCreateing && (
                <div className={styles.createContainer}>
                    <div className={styles.createWindow}>
                        <h2>新しいメモを作成</h2>
                        <input 
                            className={styles.titleInput} 
                            type="text" 
                            placeholder="タイトルを入力" 
                            value={memoTitle} 
                            onChange={(e)=>setMemoTitle(e.target.value)}
                        />
                        <textarea 
                            className={styles.contentInput} 
                            rows="13"
                            cols="50" 
                            placeholder="内容を入力" 
                            value={memoContent} 
                            onChange={(e)=>setMemoContent(e.target.value)}
                        />
                        <div className={styles.buttonContainer}>
                            <button className={styles.saveButton} onClick={handleSave}>保存</button>
                            <button className={styles.cancelButton} onClick={handleCancel}>キャンセル</button>
                        </div>
                    </div>
                </div>
            )}
            {memoList.length === 0 ? (
                <div className={styles.noMemoContainer}>
                    <span className={styles.noMemoText}>メモがありません</span>
                </div>
                ) : (
                <div className={styles.memoListContainer}>
                    <MemoList 
                        memoList={memoList} 
                        handleDelete={handleDelete} 
                        handleCancel={handleCancel}
                        handleSave={handleSave}
                        setMemoTitle={setMemoTitle}
                        setMemoContent={setMemoContent}
                        memoTitle={memoTitle}
                        memoContent={memoContent}
                        setMemoList={setMemoList}
                    />
                </div>
                )}
        </div>
    )
}

export default Memo;