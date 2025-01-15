'use client';

import { ToggleButton, ToggleButtonGroup, alpha } from '@mui/material';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { MouseEvent } from 'react';
import { usePathname, useRouter } from '@/i18n';
import { localeLangOptions } from './config';

export function LangSwitch() {
  const locale = useLocale();
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (_e: MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null) {
      const url = `${pathname}?${searchParams}`;
      replace(url, { locale: newValue });
    }
  };

  return (
    <ToggleButtonGroup color="secondary" value={locale} exclusive onChange={handleChange} size="small">
      {localeLangOptions.map(({ label, value }) => (
        <ToggleButton
          key={value}
          value={value}
          sx={({ palette, spacing }) => ({
            color: alpha(palette.common.white, 0.6),
            borderColor: alpha(palette.common.white, 0.4),
            py: spacing(0.25),
          })}
        >
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
