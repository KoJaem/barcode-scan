import { log } from "@/utils/log";
import axios from "axios";

export const postTestPrint = async (): Promise<boolean> => {
  const url = `http://localhost:5050/api/Printer/print-test`;

  try {
    const res = await axios.post(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    log("res", res);

    // 성공적으로 요청이 완료된 경우
    return true;
  } catch (err) {
    console.error("프린터 초기 설정 중 오류 발생:", err);
    throw new Error(`프린터 초기 설정 중 오류 발생: ${err}`);
  }
};
