import { log } from "@/utils/log";
import axios from "axios";

// interface PrinterPrintRequest {
//   images?: File[];
//   PrinterName?: string;
//   Orientation?: number;
//   PaperSize?: number;
//   XResolution?: number;
//   YResolution?: number;
//   ICMMethod?: number;
//   Color?: number;
//   Copies?: number;
//   Border?: number;
//   Sharpness?: number;
//   ColorAdjustment?: number;
//   GammaR?: number;
//   GammaG?: number;
//   GammaB?: number;
//   BrightnessR?: number;
//   BrightnessG?: number;
//   BrightnessB?: number;
//   ContrastR?: number;
//   ContrastG?: number;
//   ContrastB?: number;
//   ChromaR?: number;
//   ChromaG?: number;
//   ChromaB?: number;
//   OvercoatFinish?: number;
//   PrintRetry?: number;
//   Cut2Inch?: number;
// }

export const postPrint = async (formData: FormData): Promise<boolean> => {
  const url = `http://localhost:5050/api/Printer/print`;

  try {
    const res = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    log("res", res);

    // 성공적으로 요청이 완료된 경우
    return true;
  } catch (err) {
    console.error("프린터 초기 설정 중 오류 발생:", err);
    throw new Error(`프린터 초기 설정 중 오류 발생: ${err}`);
  }
};
