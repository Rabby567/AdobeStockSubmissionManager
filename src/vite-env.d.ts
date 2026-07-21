type CategoryRule = {
  keyword: string;
  category: string;
};

interface Window {
  electronAPI: {
    selectFolder: () => Promise<string | null>;

   scanFolder: (
  folderPath: string
) => Promise<
 {
  name: string;
  path: string;

  thumbnail?: string;

  thumbnailWidth: number;
  thumbnailHeight: number;

  previewWidth: number;
  previewHeight: number;

  thumbnailValid: boolean;
  previewValid: boolean;

  preview: boolean;
  hasThumbnail: boolean;
  hasPreview: boolean;

  templateCount: number;
  templateType: string;

  valid: boolean;
  validationErrors: string[];

  keywords: string;
  templateSize: string;
  pages: string;
  comments: string;
  keywordCount: number;

  filename: string;
  title: string;
  category: string;
  colorspace: string;
}[]
>;

    generateExcel: (
      templates: object[]
    ) => Promise<string>;

    generatePackages: (
      templates: object[]
    ) => Promise<string>;

    loadCategoryRules: () =>
      Promise<CategoryRule[]>;

    saveCategoryRules: (
      rules: CategoryRule[]
    ) => Promise<boolean>;

    // ==========================
    // Google Sheet Settings
    // ==========================

    saveGoogleSettings: (
      settings: {
        enabled: boolean;
        scriptUrl: string;
        sheetName: string;
      }
    ) => Promise<boolean>;

    loadGoogleSettings: () =>
      Promise<{
        enabled: boolean;
        scriptUrl: string;
        sheetName: string;
      }>;

   onGoogleProgress: (
      callback: (
        progress: number
      ) => void
    ) => void;

    getDeviceId: () => Promise<string>;

    activateLicense: (
      data: {
        licenseKey: string;
      }
    ) => Promise<{
      success: boolean;
      message?: string;
    }>;

    checkLicense: () => Promise<{
      activated: boolean;
      licenseKey?: string;
      deviceId?: string;
    }>;

 getLicenseInfo: () => Promise<{
  activated: boolean;
  customer: string;
  email: string;
  licenseKey: string;
  deviceId: string;
  plan: string;
  expiry: string;
  activatedOn?: string;
  lastCheck?: string;
  lastOnlineVerification?: string;
}>;
    getVersion: () => string;

     };
}