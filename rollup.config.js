import multi from '@rollup/plugin-multi-entry'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const isDev = process.env.NODE_ENV === 'development'

export default {
  input: [
    'src/app/content.ts',
    'src/app/background.ts',
    'src/app/script.ts',
    'src/ui/popup.tsx',
  ],
  output: {
    file: 'dist',
    format: 'iife',
    sourcemap: isDev,
  },
  plugins: [...[isDev ? [] : terser()], multi(), typescript()],
}
