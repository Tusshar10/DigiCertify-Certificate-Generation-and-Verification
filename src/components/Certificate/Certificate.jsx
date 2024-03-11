import moment from 'moment'
import styles from '../Generation/certificateGenerator.module.scss'
import { useRef } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = ({ name, course, dateOfConductStart, dateOfConductEnd, signature, signatureDetails }) => {
  const certificateRef=useRef(null);
  const handleDownloadCertificate = async () => {
    html2canvas(certificateRef.current).then(canvas=>{
      const imgData=canvas.toDataURL('image/png');
      const pdf=new jsPDF('l',"mm",[1000,670]);
      pdf.addImage(imgData,'PNG',0,0,1000,667)
      pdf.save(`${name.split(' ').join('_')}_certificate`)
    })
  };
  return (
    <>
      <div ref={certificateRef} className={styles.certificateWrapper}>
        <div className={styles.certificateContainer}>
          <div>Logo Here</div>

          <h1>CERTIFICATE OF APPRECIATION</h1>

          <span className={styles.smallText}>This certificate is proudly awarded to</span>

          <p className={styles.primaryItalicText}>{name}</p>

          <span className={styles.smallText}>for successfully completing the course</span>

          <h2>{course}</h2>

          <span className={styles.smallText}>{`conducted from ${
            dateOfConductStart ? moment(dateOfConductStart).format('MMMM YYYY') : '-'
          } to ${dateOfConductEnd ? moment(dateOfConductEnd).format('MMMM YYYY') : '-'}`}</span>

          <div className={styles.signatureBlock}>
            <img className={styles.signatureImage} src={signature.preview} alt='' />

            <span className={styles.horizontalBar} />

            <span className={styles.smallText}>{signatureDetails}</span>
          </div>
        </div>
      </div>
      <button style={{ marginTop: ' 3rem' }} onClick={handleDownloadCertificate}>Download PDF</button>
    </>
  )
}

export default Certificate