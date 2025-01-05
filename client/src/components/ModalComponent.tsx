import Button from '../components/ui/Button';
import { X } from 'lucide-react';

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
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="w-11/12 rounded-lg bg-white shadow-lg md:w-1/2 lg:w-1/3">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">{modalTitle}</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onHide}>
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <p>{modalBody}</p>
        </div>
        <div className="flex justify-end gap-2 border-t p-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              onHide();
            }}
          >
            Close
          </Button>

          <Button
            type="button"
            onClick={() => {
              onHide();
              onAction();
            }}
          >
            {actionButtonTitle}
          </Button>
        </div>
      </div>
    </div>
  );
}
