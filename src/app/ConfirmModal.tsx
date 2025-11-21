"use client";

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  onConfirm,
  onCancel
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-80 rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center text-xl font-bold text-gray-800">
          출력하시겠습니까?
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg bg-gray-200 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
