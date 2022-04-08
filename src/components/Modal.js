import React, { useEffect, useRef } from 'react'

const Modal = props => {
  const { className, isOpen, closeModal } = props
  const dialogRef = useRef(null)
  const articleRef = useRef(null)
  const handleClick = e => {
    if (isOpen && !articleRef.current.contains(e.target)) closeModal()
  }
  const addListener = () =>
    dialogRef.current.addEventListener('pointerdown', handleClick)

  const removeListener = () => {
    dialogRef.current &&
      dialogRef.current.removeEventListener('pointerdown', handleClick)
  }
  useEffect(() => {
    if (isOpen) addListener()
    return () => removeListener()
  }, [isOpen])

  return (
    <dialog open={isOpen} ref={dialogRef} style={{ overflow: 'hidden' }}>
      <article
        className={className}
        ref={articleRef}
        style={{ width: '90%', overflow: 'hidden' }}>
        {props.children}
      </article>
    </dialog>
  )
}

export default Modal
