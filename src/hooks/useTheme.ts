// hooks/useTheme.ts
import { theme as antdTheme } from 'antd';
import { useState } from 'react';

export const useAntdTheme = () => {
  const [isDark, setIsDark] = useState(false);

  const themeConfig = {
    algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: isDark ? '#1DA57A' : '#1677ff',
      borderRadius: 4,
    },
  };

  const toggleTheme = () => setIsDark((prev) => !prev);

  return { themeConfig, isDark, toggleTheme };
};
