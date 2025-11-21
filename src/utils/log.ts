// 개발 환경에서 콘솔 로그 출력
export const log = (...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};

// mwApi 로거를 사용하는 유틸 함수들
export const logger = {
  info: (message: string) => {
    if (typeof window !== "undefined" && window.mwApi?.logger) {
      window.mwApi.logger.info(`[R] ${message}`);
      log(message);
    }
  },

  warn: (message: string) => {
    if (typeof window !== "undefined" && window.mwApi?.logger) {
      window.mwApi.logger.warn(`[R] ${message}`);
      log(message);
    }
  },

  error: (message: string) => {
    if (typeof window !== "undefined" && window.mwApi?.logger) {
      window.mwApi.logger.error(`[R] ${message}`);
      log(message);
    }
  }
};
