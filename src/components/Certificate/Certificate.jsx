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
      <div className={styles.buttondiv}>
        <button style={{ marginTop: ' 3rem' }} onClick={handleDownloadCertificate}>Download PDF</button>
        <button  onClick={handleAddToIPFS}>Add to IPFS</button>
      </div>
<<<<<<< Updated upstream
      <button style={{ marginTop: ' 3rem' }} onClick={handleDownloadCertificate}>Download PDF</button>
=======
      {/* Bootstrap modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
      <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Save this Id for future verification</h5>
          </div>
          <div className="modal-body">
            {modalMsg}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      </div>
      </div>
>>>>>>> Stashed changes
    </>
  )
}

export default Certificate
