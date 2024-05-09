import moment from 'moment'
import styles from '../Fdpgenerate/fdpcertificateGenerator.module.scss'
import { useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';


const Certificate = ({ name, person_details,program, institute_name,dateOfConductStart, dateOfConductEnd, fdpsignature, fdpsignatureDetails,hodsignature, hodsignatureDetails }) => {
  const certificateRef=useRef(null);
  const orgname = localStorage.getItem("organizationname");
  const navigate=useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMsg,setModalMsg]=useState("");
  const [certificateId,setCertificateId]=useState("")
  const sname=name.substring(0,3);
  const JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzNzZiMWIxZC0yN2U3LTQyZjMtOTAyNy03MTc2YTUyMzc2NDMiLCJlbWFpbCI6InBuYXNpNzY3MEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYmZjYjIxMmNlNWNhNjU4ZjgxZmMiLCJzY29wZWRLZXlTZWNyZXQiOiJjZDNhNGU0YTk2NWYwZTQ4YjE4NmNlZTIxY2I1NDBhZGRjN2MyN2Q4MWVlMGU2Zjk2MDk2MjczYjAxNzMwMmM2IiwiaWF0IjoxNzEyODM1MjE1fQ.f7VZ2ahpOUZjDgGxJQoTilDrxP4-o_jEMmIcOSSUiR8"
  useEffect(() => {
    const fetchData = async () => {
        try {
            // Make a GET request to fetch the certificate number
            const response = await fetch(`http://localhost:3001/getcertno/${orgname}/FDP`); // Replace orgname and type with actual values
            if (!response.ok) {
                throw new Error("Failed to fetch certificate number");
            }
            const data = await response.json();
            // Assuming the response contains a property called certificateNumber with the certificate number
            var cnt=parseInt(data.count)+1;
            setCertificateId(sname+'_'+orgname.substring(0,3)+'_FDP_'+cnt.toString());
        } catch (error) {
            console.error("Error fetching certificate number:", error);
            // Handle error
        }
    };
        fetchData();
  });
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
      if(!resData.isDuplicate)
      {
        const response = await fetch("http://localhost:3001/addblock", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ hash: resData.IpfsHash }) // Assuming the response contains the IPFS hash
        });
        const responseData = await response.json();
        console.log(responseData);
        const res = await fetch("http://localhost:3001/addcertno", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name:orgname,certificateType:"FDP",certificateId:certificateId}) 
        });
      }
        setModalMsg("Certificate Id : "+resData.IpfsHash)
        setShowModal("true")
    } catch (error) {
      console.log(error);
      alert("Error Occured");
      navigate("/");
    }
  };
  return (
    <>
      <div ref={certificateRef} className={styles.certificateWrapper}>
        <div className={styles.certificateContainer}>
          <div className="mt-3"style={{ textAlign: "right" }}>Certificate Id: {certificateId}</div>
          <h1 className='mt-2' style={{fontWeight: 'bold',fontStyle: 'italic'}}>{orgname}</h1>
          <h2>CERTIFICATE OF APPRECIATION</h2>

          <span className={styles.smallText}>This certificate is proudly awarded to</span>

          <p className={styles.primaryItalicText}>{name}</p>

          <span className={styles.smallText}>for successfully completing the faculty development program on</span>

          <h2>{program}</h2>
          <p>organised by {institute_name}</p>
          <span className={styles.smallText}>{`conducted from ${
            dateOfConductStart ? moment(dateOfConductStart).format('MMMM YYYY') : '-'
          } to ${dateOfConductEnd ? moment(dateOfConductEnd).format('MMMM YYYY') : '-'}`}</span>

          <div className={styles.signatureBlock}>
            <div className='d-flex-column'>
            <img className={styles.signatureImage} src={fdpsignature.preview} alt='' />

            <span className={styles.horizontalBar} />

            <span className={styles.smallText}>{fdpsignatureDetails}</span>
            </div>
            <div className='d-flex-column'>
            <img className={styles.signatureImage} src={hodsignature.preview} alt='' />

            <span className={styles.horizontalBar} />

            <span className={styles.smallText}>{hodsignatureDetails}</span>
            </div>
          </div>
        </div>
        
      </div>
      <div className={styles.buttondiv}>
        <button  onClick={handleDownloadCertificate}>Download PDF</button>
        <button  onClick={handleAddToIPFS}>Add to IPFS</button>
      </div>
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
    </>
  )
}

export default Certificate