import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  toEscapedSelector,
  transformerAttributifyJsx,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import extractorPug from '@unocss/extractor-pug'

export default defineConfig({
  rules: [
    [/^custom-(.+)$/, ([, name], { rawSelector }) => {
      const selector = toEscapedSelector(rawSelector)
      if (name.includes('noscrollbar')) {
        return `
          ${selector}::-webkit-scrollbar {
            display: none;
          }
        `
      }
    }],
  ],
  shortcuts: [
    ['flex-bc', 'flex justify-between items-center'],
    ['flex-ec', 'flex justify-end items-center'],
    ['flex-cc', 'flex justify-center items-center'],
    ['flex-ce', 'flex justify-center items-end'],
    ['flex-cx', 'flex justify-center'],
    ['flex-cy', 'flex items-center'],
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      scale: 1,
      warn: true,
      collections: {
        icon: FileSystemIconLoader('./assets/icons'),
      },
      customizations: {
        transform(svg, collection, icon) {
          // do not apply fill to this icons on this collection
          if (collection === 'custom' && icon === 'my-icon')
            return svg
          return svg.replace(/#fff/, 'currentColor')
        },
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerAttributifyJsx({}),
  ],
  safelist: [
  ],
  extractors: [
    extractorPug(),
  ],
})
