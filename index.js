const plugin = require('tailwindcss/plugin')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default

module.exports = plugin(function ({ matchUtilities, theme, addBase }) {
    // Add default configuration
    addBase({
        ':root': {
            '--tw-inverted-border-color': '#000',
        },
    })

    // Create the inverted-border-{size} utility
    matchUtilities(
        {
            'inverted-border': (value) => ({
                width: value,
                height: value,
                aspectRatio: '1',
                backgroundImage: `radial-gradient(circle at 100% 100%, transparent calc(${value} - 1px), var(--tw-inverted-border-color) ${value})`,
                isolation: 'isolate', // Ensures proper stacking context
            }),
        },
        {
            values: theme('borderRadius'),
            supportsNegativeValues: false,
        }
    )

    // Create the inverted-border-{color} utility
    matchUtilities(
        {
            'inverted-border': (value) => ({
                '--tw-inverted-border-color': value.toString(),
            }),
        },
        {
            values: (({ ...colors }) => flattenColorPalette(colors))(theme('colors')),
            type: 'color',
        }
    )
}) 