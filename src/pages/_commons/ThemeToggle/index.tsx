import React, { useEffect, useState } from 'react';
import { ReactComponent as MoonIcon } from '../../../assets/svg/moon.svg';
import { ReactComponent as SunIcon } from '../../../assets/svg/sun.svg';

const updateTheme = (isDarkEnabled: boolean) => {
  const styles = getComputedStyle(document.body);
  const black = styles.getPropertyValue('--gray-d02');
  const white = styles.getPropertyValue('--white');
  const docEl = document.documentElement;

  if (isDarkEnabled) {
    docEl.style.setProperty('--background', black);
    docEl.style.setProperty('--foreground', white);
    document.querySelector('html')!.classList.add('darkmode');
  } else {
    docEl.style.setProperty('--background', white);
    docEl.style.setProperty('--foreground', black);
    document?.querySelector('html')!.classList.remove('darkmode');
  }
};

const ThemeToggle: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  const toggleState = () => {
    setIsEnabled(prevState => !prevState);
  };

  useEffect(() => {
    updateTheme(!isEnabled);
  }, [isEnabled]);

  return (
    <label className="toggle-wrapper" htmlFor="toggle">
      <div className={`toggle ${isEnabled ? 'enabled' : 'disabled'}`}>
        <span className="hidden">
          {isEnabled ? 'Enable Dark Mode' : 'Enable Light Mode'}
        </span>
        <div className="icons">
          <MoonIcon />
          <SunIcon />
        </div>
        <input
          id="toggle"
          name="toggle"
          type="checkbox"
          checked={isEnabled}
          onChange={toggleState}
        />
      </div>
    </label>
  );
};

export default ThemeToggle;
