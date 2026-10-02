import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function iconsaxReact19() {
  const targetPattern = /var\s+variant\s*=\s*(\w+)\.variant,\s*color\s*=\s*\1\.color,\s*size\s*=\s*\1\.size,/g;
  return {
    name: 'vite-plugin-iconsax-react19',
    transform(code, id) {
      if (id.includes('iconsax-react') && targetPattern.test(code)) {
        return {
          code: code.replace(targetPattern, (match, paramName) => {
            return `var variant = ${paramName}.variant || "Linear", color = ${paramName}.color || "currentColor", size = ${paramName}.size || "24",`;
          }),
          map: null,
        };
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), iconsaxReact19()],
  server: {
    port: 3000,
  },
})

