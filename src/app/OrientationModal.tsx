"use client";

interface OrientationModalProps {
  onSelect: (orientation: 1 | 2) => void;
}

export default function OrientationModal({
  onSelect
}: OrientationModalProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-80 rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center text-xl font-bold text-gray-800">
          출력 방향을 선택하세요
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => onSelect(1)}
            className="flex-1 rounded-lg bg-green-500 px-4 py-3 font-medium text-white transition-colors hover:bg-green-600"
          >
            가로 출력
          </button>
          <button
            onClick={() => onSelect(2)}
            className="flex-1 rounded-lg bg-purple-500 px-4 py-3 font-medium text-white transition-colors hover:bg-purple-600"
          >
            세로 출력
          </button>
        </div>
      </div>
    </div>
  );
}
