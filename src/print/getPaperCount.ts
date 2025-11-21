import axios from "axios";

export const getPaperCount = async (): Promise<number> => {
  const url = `http://localhost:5050/api/Printer/paper-count`;

  try {
    const res = await axios.get(url);

    // 성공적으로 요청이 완료된 경우
    return res.data;
  } catch (err) {
    console.error("프린터 초기 설정 중 오류 발생:", err);
    throw new Error(`프린터 초기 설정 중 오류 발생: ${err}`);
  }
};
