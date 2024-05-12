import {getEmotionImage} from "../util/get-emotion-image"
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import "./DiaryItem.css"
const DiaryItem=({id,emotionId,createdDate,content}) =>{
    const nav = useNavigate()
    return (
        <div className = "DiaryItem">
            <div 
                onClick={()=>{nav(`/diary/${id}`)}}
                className={`img_section img_section_${emotionId}`}>
                <img src={getEmotionImage(emotionId)}/>
            </div>
            <div
                onClick={()=>{nav(`/diary/${id}`)}} 
                className="info_section">
                <div className="created_date">{new Date(createdDate).toLocaleDateString()}</div>
                <div className="content">{content}</div>
            </div>
            <div className="button_section">
                <Button text={"수정하기"} onclick={()=>{nav(`/edit/${id}`)}}/>
            </div>
        </div>
    )
}

export default DiaryItem;