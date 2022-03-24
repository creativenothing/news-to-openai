import React, { useEffect, useRef } from 'react'

const Modal = props => {
  const { isOpen, toggleModal } = props
  const dialogRef = useRef(null)
  const articleRef = useRef(null)

  const click = e => {
    if (!articleRef.current.contains(e.target)) {
      closeModal()
    }
  }

  useEffect(() => {
    if (!dialogRef.current.open && isOpen) {
      dialogRef.current.showModal()
      document.addEventListener('mousedown', click)
    }
    if (dialogRef.current.open && !isOpen) {
      closeModal()
    }
  })

  const closeModal = () => {
    document.removeEventListener('mousedown', click)
    dialogRef.current.close()
    toggleModal(false)
  }

  return (
    <dialog ref={dialogRef} style={{ overflow: 'hidden' }}>
      <article ref={articleRef} style={{ width: '90%', overflow: 'hidden' }}>
        {props.children}
      </article>
    </dialog>
  )
}

export default Modal
