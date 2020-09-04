module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['src/**/*.jsx', 'src/**/*.tsx'],
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    extend: {
      screens: {
        uxl: '1600px',
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
      },
    },
  },
  variants: {},
  plugins: [],
};
