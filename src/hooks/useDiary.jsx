import { useNavigate } from "react-router-dom";
import { DiaryStateContext} from '../App';
import { useContext,useEffect,useState } from "react";

const useDiary =(id)=>{
    const nav = useNavigate()

    const data = useContext(DiaryStateContext);
    const [curDiaryItem,setcurDiaryItem] = useState();
    useEffect(()=>{
        const findDiaryitem = data.find((item)=>{
            return String(item.id) === String(id)
        })
        if(!findDiaryitem) {
            window.alert("존재하지않는 일기")
            nav('/',{replace:true})
        }
        setcurDiaryItem(findDiaryitem);
    },[id,data])
    return curDiaryItem;
}
export default useDiary;