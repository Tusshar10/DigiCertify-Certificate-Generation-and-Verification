import { useEffect, useReducer, useState } from 'react'

import styles from './HackcertificateGenerator.module.scss'
import Header from '../header/Header'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal/Modal'
import Certificate from '../Hackcertificate/Hackcertificate'

const initialState = {
  name: 'Ayushi',
  person_details:'JIIT Noida',
  Hackathon: 'RIDE',
  teamname:'Coder-X',
  position:'1st',
  institute_name:'IIT Bombay',
  hacksignature: '',
  hacksignatureDetails: 'Coordinator',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'TEXT_CHANGE':
      return { ...state, [action.field]: action.payload }

    default:
      break
  }
}
function Hackgeneration() {
  const navigate=useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if(!token)
    {
      navigate("/login");
    }
  }, []);
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [formState, dispatch] = useReducer(reducer, initialState)

  const handleSubmitForm = e => {
    e.preventDefault()
    const { name, person_details,Hackathon, position,teamname,institute_name,hacksignature, hacksignatureDetails} = formState

    if (name && person_details && Hackathon && position && teamname && institute_name && hacksignature && hacksignatureDetails) {
      setIsOpenModal(true)
    } else {
      alert('Please fill all details')
    }
  }

  const handleTextChange = e => {
    dispatch({ type: 'TEXT_CHANGE', field: e.target.name, payload: e.target.value })
  }

  return (
    <>
    <Header/>
      <div className={styles.wrapper} style={{paddingTop:"10px"}}>
        <div className={styles.container} >
          <form onSubmit={handleSubmitForm}>
            <div className={styles.inputGroup}>
              <label htmlFor='user-name'>Name</label>
              <input type='text' name='name' value={formState.name} onChange={handleTextChange} id='user-name' />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor='person_details'>Participant's Institute Name</label>
              <input type='text' name='person_details' value={formState.person_details} onChange={handleTextChange} id='person_details' />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor='teamname'>Team Name</label>
              <input type='text' name='teamname' value={formState.teamname} onChange={handleTextChange} id='teamname' />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor='position'>Position Obtained</label>
              <select name='position' value={formState.position} onChange={handleTextChange} id='position'>
                <option value='1st'>1st</option>
                <option value='2nd'>2nd</option>
                <option value='3rd'>3rd</option>
                <option value='Participant'>Participant</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor='Hackathon'>Hackathon Name</label>
              <input type='text' name='Hackathon' value={formState.Hackathon} onChange={handleTextChange} id='Hackathon' />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor='institute_name'>Organiser's Name</label>
              <input type='text' name='institute_name' value={formState.institute_name} onChange={handleTextChange} id='institute_name' />
            </div>

            {/* <div className={styles.inputGroup}>
              <label htmlFor='dateOfConductStart'>Date of Conduct - Start</label>
              <input
                type='date'
                value={formState.dateOfConductStart}
                onChange={handleTextChange}
                name='dateOfConductStart'
                id='dateOfConductStart'
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor='dateOfConductEnd'>Date of Conduct - End</label>
              <input
                type='date'
                value={formState.dateOfConductEnd}
                onChange={handleTextChange}
                name='dateOfConductEnd'
                id='dateOfConductEnd'
              />
            </div> */}

            <div className={styles.inputGroup}>
              <label htmlFor='hacksignature'>Signature of Hackathon Coordinator</label>
              <input
                type='file'
                name='hacksignature'
                id='hacksignature'
                onChange={e => {
                  const selected = e.target.files[0]

                  const objectUrl = URL.createObjectURL(selected)

                  dispatch({ type: 'TEXT_CHANGE', field: e.target.name, payload: { ...selected, preview: objectUrl } })
                }}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor='hacksignatureDetails'>Details of Hackathon Coordinator</label>
              <input
                type='text'
                name='hacksignatureDetails'
                value={formState.hacksignatureDetails}
                onChange={handleTextChange}
                id='hacksignatureDetails'
              />
            </div>
            <button type='submit'>Generate Certificate</button>
          </form>
        </div>
      </div>
      <Modal isOpen={isOpenModal} handleClose={() => setIsOpenModal(false)}>
        <Certificate {...formState} />
      </Modal>
    </>
  )
}

export default Hackgeneration