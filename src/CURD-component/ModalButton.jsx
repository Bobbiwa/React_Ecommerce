import React, { useState } from 'react'
import Button from './Button';
import Modal from './Modal';

export default function ModalButton() {
    const [visibleModal, setVisibleModal] = useState(false)
    const showModal = (e) => {
        e.stopPropagation()
        setVisibleModal(true)
    }
    const handleCloseModal = () => {
        console.log('触发了关闭');
        setVisibleModal(false)
    }

    return (
        <div style={{ padding: '20px' }}>
            <Button type='link' onClick={showModal} >showModal</Button>
            <Modal title="Category Name" visible={visibleModal} onClose={handleCloseModal} />
        </div>
    )
}