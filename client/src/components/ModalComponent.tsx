import { Button as BButton } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from './Button';

interface ModalProps {
  show: boolean;
  onHide: () => void;
  actionButtonTitle: string;
  modalTitle: string;
  modalBody: string;
  onAction: () => void;
}

export default function ModalComponent({
  show,
  onHide,
  actionButtonTitle,
  modalTitle,
  modalBody,
  onAction,
}: ModalProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <BButton variant="secondary" onClick={onHide}>
          Close
        </BButton>
        <Button
          type="button"
          title={actionButtonTitle}
          onClick={() => {
            onHide();
            onAction();
          }}
        />
      </Modal.Footer>
    </Modal>
  );
}
