import { useEffect, useReducer, useState } from 'react'

import styles from './certificateGenerator.module.scss'
import Header from '../header/Header'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal/Modal'
import Certificate from '../Certificate/Certificate'

const initialState = {
  name: 'Ayushi',
  course: 'Data Structure and Algorithm',
  dateOfConductStart: '2020-05-20',
  dateOfConductEnd: '2023-05-20',
  signature: '',
  signatureDetails: 'CEO, CipherGuy',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'TEXT_CHANGE':
      return { ...state, [action.field]: action.payload }

    default:
      break
  }
}
function Generation() {
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
    const { name, course, dateOfConductStart, dateOfConductEnd, signature, signatureDetails } = formState

    if (name && course && dateOfConductStart && dateOfConductEnd && signature && signatureDetails) {
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
              <label htmlFor='course'>Course</label>
              <input type='text' name='course' value={formState.course} onChange={handleTextChange} id='course' />
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
              <label htmlFor='signature'>Signature</label>
              <input
                type='file'
                name='signature'
                id='signature'
                onChange={e => {
                  const selected = e.target.files[0]

                  const objectUrl = URL.createObjectURL(selected)

                  dispatch({ type: 'TEXT_CHANGE', field: e.target.name, payload: { ...selected, preview: objectUrl } })
                }}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor='signatureDetails'>Signature Details</label>
              <input
                type='text'
                name='signatureDetails'
                value={formState.signatureDetails}
                onChange={handleTextChange}
                id='signatureDetails'
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

export default Generation