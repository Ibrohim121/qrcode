import { defineConfig, presetUno, presetIcons, presetTypography } from 'unocss'
import { transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({ scale: 1.2 }),
    presetTypography(),
  ],
  transformers: [transformerVariantGroup()],
  theme: {
    colors: {
      brand: {
        50: '#f5fbff',
        100: '#e6f4ff',
        500: '#3b82f6',
        600: '#2563eb',
      },
    },
    boxShadow: {
      card: '0 6px 20px rgba(0,0,0,0.08)',
    },
    borderRadius: {
      card: '14px',
    },
  },
})