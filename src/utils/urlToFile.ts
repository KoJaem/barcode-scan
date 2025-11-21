/**
 * URL에서 이미지를 가져와 File 객체로 변환
 * @param url 이미지 URL
 * @param filename 파일명 (기본값: "photo.jpg")
 * @returns File 객체
 */
export async function urlToFile(
  url: string,
  filename: string = "photo.jpg"
): Promise<File> {
  try {
    // URL에서 이미지 가져오기
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`이미지 다운로드 실패: ${response.statusText}`);
    }

    // Blob으로 변환
    const blob = await response.blob();

    // File 객체 생성
    const file = new File([blob], filename, { type: blob.type });

    return file;
  } catch (error) {
    console.error("URL을 File로 변환하는 중 오류 발생:", error);
    throw error;
  }
}
