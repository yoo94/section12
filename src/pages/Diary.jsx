import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";

import { useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import { getStringDate } from '../util/getStirngDate';

const Diary = () => {
    const params = useParams();
    const nav = useNavigate()
    const curDiaryItem = useDiary(params.id)
    if(!curDiaryItem) return <div>  데이터 로딩중 ...</div>
    const {createdDate,emotionId,content} = curDiaryItem;

    const title = getStringDate(new Date(createdDate));
    return(
        <div>
             <Header 
                title={`${title} 기록`}
                leftChild={<Button onclick={()=>{nav(-1)}} text={"< 뒤로가기"}/>}
                rightChild={<Button onclick={()=>{nav(`/edit/${params.id}`)}}text={"수정하기"}/>}
            />
            <Viewer emotionId={emotionId} content={content}/>
        </div>
    )
};

export default Diary;