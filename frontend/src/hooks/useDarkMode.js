import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('dark-mode');
    // Phải parse để lấy giá trị boolean thực sự
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('dark-mode', JSON.stringify(isDark));
  }, [isDark]);

  return [isDark, setIsDark];
}