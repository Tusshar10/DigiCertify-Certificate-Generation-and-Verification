import { useEffect, useReducer, useState } from 'react'

import styles from './fdpcertificateGenerator.module.scss'
import Header from '../header/Header'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal/Modal'
import Certificate from '../Fdpcertificate/Fdpcertificate'

const initialState = {
  name: 'Ayushi',
  person_details:'JIIT Noida',
  program: 'Data Structure and Algorithm',
  institute_name:'IIT Bombay',
  dateOfConductStart: '2020-05-20',
  dateOfConductEnd: '2023-05-20',
  fdpsignature: '',
  fdpsignatureDetails: 'Coordinator',
  hodsignature: '',
  hodsignatureDetails: 'CSE Department',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'TEXT_CHANGE':
      return { ...state, [action.field]: action.payload }

    default:
      break
  }
}
function Fdpgeneration() {
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
    const { name, person_details,program, institute_name,dateOfConductStart, dateOfConductEnd, fdpsignature, fdpsignatureDetails,hodsignature, hodsignatureDetails } = formState

    if (name && person_details && program && institute_name && dateOfConductStart && dateOfConductEnd && fdpsignature && fdpsignatureDetails && hodsignature && hodsignatureDetails) {
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
            {/* <div className={styles.inputGroup}>
              <label htmlFor='person_details'>Person Designation</label>
              <input type='text' name='person_details' value={formState.person_details} onChange={handleTextChange} id='person_details' />
            </div> */}
            <div className={styles.inputGroup}>
              <label htmlFor='program'>Program Name</label>
              <input type='text' name='program' value={formState.program} onChange={handleTextChange} id='program' />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor='institute_name'>Organising Institute Name</label>
              <input type='text' name='institute_name' value={formState.institute_name} onChange={handleTextChange} id='institute_name' />
            </div>

            <div className={styles.inputGroup}>
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
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor='fdpsignature'>Signature of FDP Coordinator</label>
              <input
                type='file'
                name='fdpsignature'
                id='fdpsignature'
                onChange={e => {
                  const selected = e.target.files[0]

                  const objectUrl = URL.createObjectURL(selected)

                  dispatch({ type: 'TEXT_CHANGE', field: e.target.name, payload: { ...selected, preview: objectUrl } })
                }}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor='fdpsignatureDetails'>Details of FDP Coordinator</label>
              <input
                type='text'
                name='fdpsignatureDetails'
                value={formState.fdpsignatureDetails}
                onChange={handleTextChange}
                id='fdpsignatureDetails'
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor='hodsignature'>Signature of HOD</label>
              <input
                type='file'
                name='hodsignature'
                id='hodsignature'
                onChange={e => {
                  const selected = e.target.files[0]

                  const objectUrl = URL.createObjectURL(selected)

                  dispatch({ type: 'TEXT_CHANGE', field: e.target.name, payload: { ...selected, preview: objectUrl } })
                }}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor='hodsignatureDetails'>Details of HOD</label>
              <input
                type='text'
                name='hodsignatureDetails'
                value={formState.hodsignatureDetails}
                onChange={handleTextChange}
                id='hodsignatureDetails'
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

export default Fdpgeneration