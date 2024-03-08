import styles from "./CardTemplate.module.css" 


function CardTemplate(props){

    const imgSrc = props.src;
 

    
    return(
        <div className={styles.card} id ={styles.background} src={imgSrc}>
            <img className={styles.visuallyHidden} src={imgSrc} alt="img" />
        </div>
    )
}


export default CardTemplate;