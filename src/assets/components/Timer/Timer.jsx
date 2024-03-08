import { useEffect, useRef, useState } from "react";
import styles from "./Timer.module.css"
function Timer(props){
    let isStarted = props.isStarted;
    let [min , setMin] = useState(0);
    let [sec , setSec] = useState(0);

    if (isStarted){
        setInterval(() => {
            setSec(++sec);
            if (sec > 59){
                setMin(++min);
            }
        },1000)
    }
 
    return(
        <div className={styles.timerContainer}>
            <h3>
                <span>{(min <= 9 ) ? "0" + min : min}</span> : 
                <span>{(sec <= 9 ) ? "0" + sec : sec}</span>
            </h3>
        </div>
    )
}


export default Timer;