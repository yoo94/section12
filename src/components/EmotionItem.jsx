import "./EmotionItem.css"
import {getEmotionImage}  from "../util/get-emotion-image"

const  EmotionItem=({emotionId,emotionName,isSelected,onClick})=>{
    return(
        <div 
            className={`emotionItem  ${ isSelected ? `EmtionItem_on_${emotionId}`:""}`}
            onClick={onClick}
        >
            <img className="emotion_img" src={getEmotionImage(emotionId)}/>
            <div className="emotion_name">{emotionName}</div>
        </div>
    )
}
export default EmotionItem;