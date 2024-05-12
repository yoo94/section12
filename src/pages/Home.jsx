import { useState,useContext } from 'react';
import { DiaryStateContext } from '../App';

import Header from '../components/Header'
import Button from '../components/Button'
import DiaryList from '../components/DiaryList'

const getMonthlyData = (pivotDate,data)=>{
    const beginTime = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth(),1,0,0,0
    ).getTime();

    const endTime = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth()+1,0,23,59,59
    ).getTime();

    return data.filter((item)=>{
        return (beginTime <= item.createdDate) && (item.createdDate <=endTime)
    })
}

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate,setPivotDate] = useState(new Date());
    const montlyData = getMonthlyData(pivotDate,data)
    
    const onIncreaseMonth =()=>{
        setPivotDate(new Date(pivotDate.getFullYear(),pivotDate.getMonth()+1))
    }
    const ondecreaseMonth =()=>{
        setPivotDate(new Date(pivotDate.getFullYear(),pivotDate.getMonth()-1))
    }

    return(
        <div>
            <Header 
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`}
                leftChild={<Button 
                                text={"<"}
                                onclick={ondecreaseMonth}
                            />}
                rightChild={<Button
                                text={">"}
                                onclick={onIncreaseMonth}
                            />}
            />
            <DiaryList data={montlyData}/>
        </div>
    )
};

export default Home;