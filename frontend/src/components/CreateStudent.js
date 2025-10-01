import React from 'react'

function CreateStudent() {
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form action="">
                <h2 className='fw-bolder mb-5'> Ajouter un Etudiant </h2>
                    <div className='mb-2'>
                        <label for="" className='me-2'> Nom </label>
                        <input placeholder='Tapez votre Nom' className='w-50' type="text"/>
                    </div>
                    <div className='mb-2'>
                        <label for="" className='me-2'> Email </label>
                        <input placeholder='Tapez votre eMail' className='w-50' type="text"/>
                    </div>
                <button className='btn btn-outline-success mt-3'>Soumettre</button>
            </form>
        </div>
    </div>
  )
}

export default CreateStudent
