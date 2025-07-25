import styles from './MemoList.module.css';
import { useState } from 'react';


function MemoList(props) {


    const {memoList,handleDelete} = props;
    //メモリストの題名をクリックしたら、そのメモの内容が表示されるための状態管理
    const [expandedMemo,setExpandedMemo] = useState(null);

    const toggleContent = (memo) => {
        setExpandedMemo(expandedMemo === memo ? null : memo);
    }

    //メモを削除するボタン
    return(
        <div className={styles.memoListContainer}>
            {memoList.map((memo,index)=>(
                <div key={index} className={styles.memoItem}>
                    <p className={styles.memoTitle}>{memo.title}</p>
                    <button className={styles.deleteButton} onClick={()=>handleDelete(memo)}>削除</button>
                </div>
            ))}
        </div>
        
    )
}

export default MemoList;