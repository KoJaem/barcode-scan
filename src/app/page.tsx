"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import Toast from "./Toast";
import ConfirmModal from "./ConfirmModal";
import OrientationModal from "./OrientationModal";
import { urlToFile } from "@/utils/urlToFile";
import { postPrint } from "@/print/postPrint";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  const [scannedUrl, setScannedUrl] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success" | "info";
  } | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showOrientationModal, setShowOrientationModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const matchingKey = process.env.NEXT_PUBLIC_MATCHING_KEY

    if (!videoRef.current || !matchingKey) return;
    
    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        const url = result.data;

        // URL 유효성 검사 MATCHING_KEY 포함 여부
        if (!url.includes(matchingKey)) {
          setToast({
            message: "유효하지 않은 QR입니다.",
            type: "error"
          });
          return;
        }

        // 유효한 QR 코드
        setScannedUrl(url);
        setShowConfirmModal(true);

        // 스캔 일시 정지
        qrScanner.pause();
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true
      }
    );

    qrScanner.start();
    qrScannerRef.current = qrScanner;

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setShowOrientationModal(true);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setScannedUrl(null);

    // 스캔 재개
    qrScannerRef.current?.start();
  };

  const handleOrientationSelect = async (orientation: 1 | 2) => {
    setShowOrientationModal(false);
    setIsProcessing(true);

    try {
      if (!scannedUrl) {
        throw new Error("스캔된 URL이 없습니다.");
      }

      // URL에서 이미지 파일 가져오기
      const imageFile = await urlToFile(scannedUrl);

      // FormData 생성
      const formData = new FormData();
      formData.append("images", imageFile);
      formData.append("PrinterName", "DS-RX1");
      formData.append("Orientation", orientation.toString());

      // 프린트 요청
      await postPrint(formData);

      setToast({
        message: "출력 완료",
        type: "success"
      });
    } catch (error) {
      console.error("출력 중 오류 발생:", error);
      setToast({
        message: "출력 실패",
        type: "error"
      });
    } finally {
      setIsProcessing(false);
      setScannedUrl(null);

      // 스캔 재개
      qrScannerRef.current?.start();
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          QR 코드 스캔
        </h1>

        <div className="overflow-hidden rounded-lg shadow-lg">
          <video
            ref={videoRef}
            className="h-auto w-full"
            style={{ maxHeight: "400px" }}
          />
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          카메라에 QR 코드를 비춰주세요
        </p>

        {isProcessing && (
          <div className="mt-4 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-2 text-sm text-gray-600">처리 중...</p>
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {showConfirmModal && (
        <ConfirmModal onConfirm={handleConfirm} onCancel={handleCancel} />
      )}

      {showOrientationModal && (
        <OrientationModal onSelect={handleOrientationSelect} />
      )}
    </section>
  );
}
