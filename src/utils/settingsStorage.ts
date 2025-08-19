export interface AppSettings {
  fontSize: 'small' | 'medium' | 'large';
  primaryColor: string;
  secondaryColor: string;
}

export const defaultSettings: AppSettings = {
  fontSize: 'medium',
  primaryColor: '#1976d2',
  secondaryColor: '#9c27b0'
};

const SETTINGS_KEY = 'anynote_settings';

export const getSettings = (): AppSettings => {
  if (typeof window === 'undefined') return defaultSettings;
  try {
    const settings = localStorage.getItem(SETTINGS_KEY);
    if (!settings) return defaultSettings;
    
    const parsedSettings = JSON.parse(settings);
    // 确保所有必需的字段都存在且类型正确
    if (!parsedSettings || typeof parsedSettings !== 'object') {
      return defaultSettings;
    }

    return {
      fontSize: ['small', 'medium', 'large'].includes(parsedSettings.fontSize) ? parsedSettings.fontSize : defaultSettings.fontSize,
      primaryColor: typeof parsedSettings.primaryColor === 'string' ? parsedSettings.primaryColor : defaultSettings.primaryColor,
      secondaryColor: typeof parsedSettings.secondaryColor === 'string' ? parsedSettings.secondaryColor : defaultSettings.secondaryColor
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    return defaultSettings;
  }
};

export const saveSettings = (settings: AppSettings): void => {
  if (typeof window === 'undefined') return;
  
  try {
    // 验证设置对象的完整性
    if (!settings || typeof settings !== 'object') {
      throw new Error('Invalid settings object');
    }

    // 验证并清理设置值
    const validatedSettings: AppSettings = {
      fontSize: ['small', 'medium', 'large'].includes(settings.fontSize) ? settings.fontSize : defaultSettings.fontSize,
      primaryColor: typeof settings.primaryColor === 'string' ? settings.primaryColor : defaultSettings.primaryColor,
      secondaryColor: typeof settings.secondaryColor === 'string' ? settings.secondaryColor : defaultSettings.secondaryColor
    };

    localStorage.setItem(SETTINGS_KEY, JSON.stringify(validatedSettings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};
