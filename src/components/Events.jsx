import React from 'react';
import Header from './header/Header';
import { useNavigate } from 'react-router-dom';

export default function Events() {
  const navigate = useNavigate();
  const course = () => {
    navigate("/coursegenerate")
  }
  const fdp = () => {
    navigate("/fdpgenerate")
  }
  return (
    <>
      <Header></Header>
      <div className="d-flex flex-column align-items-center justify-content-center" style={{height:"70vh"}}>
      <div className='d-flex justify-content-center'>
      <h1 style={{color:"white"}}>Select type of Certificate</h1>
      </div>
      <div className='d-flex justify-content-center'>
      <button type="button" style={{ fontSize: '2rem', padding: '1rem 1rem', margin: '1rem',width:'35%'}} className="btn btn-primary btn-lg genbtn" onClick={course}>
          Course Certificate
        </button>
        <button type="button" style={{ fontSize: '2rem', padding: '1rem 1rem', margin: '1rem' ,width:'35%'}} className="btn btn-secondary btn-lg verbtn" onClick={fdp}>
          FDP Certificate
        </button>
        </div>
        </div>
    </>
  );
}
