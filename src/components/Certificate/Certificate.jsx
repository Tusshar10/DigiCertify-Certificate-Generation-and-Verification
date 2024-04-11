import moment from 'moment'
import styles from '../Generation/certificateGenerator.module.scss'
import { useRef } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = ({ name, course, dateOfConductStart, dateOfConductEnd, signature, signatureDetails }) => {
  const certificateRef=useRef(null);
  const JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzNzZiMWIxZC0yN2U3LTQyZjMtOTAyNy03MTc2YTUyMzc2NDMiLCJlbWFpbCI6InBuYXNpNzY3MEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYmZjYjIxMmNlNWNhNjU4ZjgxZmMiLCJzY29wZWRLZXlTZWNyZXQiOiJjZDNhNGU0YTk2NWYwZTQ4YjE4NmNlZTIxY2I1NDBhZGRjN2MyN2Q4MWVlMGU2Zjk2MDk2MjczYjAxNzMwMmM2IiwiaWF0IjoxNzEyODM1MjE1fQ.f7VZ2ahpOUZjDgGxJQoTilDrxP4-o_jEMmIcOSSUiR8"
  const handleDownloadCertificate = async () => {
    html2canvas(certificateRef.current).then(canvas=>{
      const imgData=canvas.toDataURL('image/png');
      const pdf=new jsPDF('l',"mm",[1000,670]);
      pdf.addImage(imgData,'PNG',0,0,1000,667)
      pdf.save(`${name.split(' ').join('_')}_certificate`)
    })
  };
  const handleAddToIPFS = async () => {
    try {
      const canvas = await html2canvas(certificateRef.current);
      const imgData = canvas.toDataURL('image/png');

      // Convert base64 encoded image to blob
      const blob = await fetch(imgData).then(res => res.blob());

      // Create form data to send to Pinata
      const formData = new FormData();
      formData.append('file', blob, `${name.split(' ').join('_')}_certificate.png`);
  
      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS",{
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: formData,
    });
      const resData = await res.json();
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
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
      <button  onClick={handleAddToIPFS}>Add to IPFS</button>
    </>
  )
}

export default Certificate