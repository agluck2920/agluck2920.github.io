import * as React from 'react';
import styles from './page.module.css';
 
interface Props {
  page: number
}

export default function ProgressBar(props: Props) {

  const {page} = props;

  function calculateColor(step: number) {
      if (page === step) {
        return '#aee5c0'; 
      } else if (page < step) {
        return '#888888'; 
      } else {
        return '#00531b';
      }
  }

  return (
    <div className={styles.container}>
      {
        Array.from({length: 3}, (_, index) => {
          const stepColor = calculateColor(index + 1);
          const progressBarColor = calculateColor(index + 2);

          return (
            <React.Fragment key={index}>
              <div className={styles['step-container']}>
                <div style={{backgroundColor: stepColor}} className={`${styles['step-circle']} `}></div>
                <div style={{color: stepColor}} >Step {index + 1}</div>
              </div>
              { index !== 2 && <div style={{backgroundColor: progressBarColor}} className={`${styles['progress-bar']}`}></div>}
            </React.Fragment>
          )
        })
      }
    </div>
  );
}