declare global {
  interface Window {
    mwApi?: {
      // Test APIs
      // testText: () => string;
      // testSend: (params: any) => void;
      // testSendReply: (callback: (data: any) => void) => void;
      // testOff: () => void;
      // testSendSync: (params: any) => any;
      // testInvoke: (params: any) => Promise<any>;

      // Device APIs
      getDeviceToken: () => Promise<string>;

      // Logger APIs
      logger: {
        info: (message: string) => void;
        warn: (message: string) => void;
        error: (message: string) => void;
      };

      // 확장 가능한 구조 (새로운 API들이 추가될 때)
      [key: string]: any;
    };
  }
}

export {};
