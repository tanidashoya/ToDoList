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
            content:memoContent,
            createdAt:new Date().toLocaleDateString()
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

    //ctrl+cキーが押されたら作成画面を開く
    //Reactの中で JavaScript の「生のAPI（DOM API）」を使うのはよくあること   
    //useEffect() → 副作用を実行するためのフック(第二引数に[]を渡すと、初回のみ実行される)
    //「初回」とは、そのコンポーネント（ここでは Memo）が画面上に初めて表示（＝マウント）されるタイミング
    //再びMemoコンポーネントが表示されたときにも、useEffect が実行される
    //「Reactの世界では、はじめから window.addEventListener を設置してはいけない」から useEffect が必要
    //ページコンポーネントを切り替えてまたもとのページコンポーネントを表示したときに
    //何度もwindow.addEventListener('keydown', handleKeyDownCreate)が呼ばれてしまう
    // useEffect とクリーンアップ関数を使うことで、
    // window.addEventListener が再レンダリングや再マウント時に
    // 重複して登録されるのを防いでいる
    //Reactでは DOM操作に関わるコードは useEffect(() => {...}, []) の中に書くのが原則・一般的
    useEffect(() => {
        const handleKeyDownCreate = (e) => {
            if (e.ctrlKey && e.key === 'c') {
                e.preventDefault(); // ブラウザのデフォルト動作を防ぐ（コピーとか）
                setIsCreateing(true);
            }
        };

        //addEventListener() → イベントリスナーを追加するメソッド
        //第一引数：keydown → キーが押されたときに発火するイベント
        //第二引数：handleKeyDownCreate → キーが押されたときに実行する関数
        window.addEventListener('keydown', handleKeyDownCreate);
        
        //クリーンアップ関数
        //removeEventListener() → イベントリスナーを削除するメソッド
        //実行されるタイミング：コンポーネントがアンマウントされるタイミング
        //コンポーネントがアンマウントされるタイミング：コンポーネントが画面から消えるタイミング
        return () => {
            window.removeEventListener('keydown', handleKeyDownCreate);
        };
    }, []);
    

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
                    <div className={styles.memoListTitle}>
                        <span className={styles.memoListTitleText}>MemoList</span>
                    </div>
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