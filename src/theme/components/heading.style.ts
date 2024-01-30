// eslint-disable-next-line import/no-anonymous-default-export
export default {
	baseStyle: {
		fontFamily: 'heading',
		fontWeight: 'medium',
	},
	variants: {
		h1: {
			fontSize: '5xl',
			lineHeight: '10',
		},
		h2: {
			fontSize: '3xl',
			lineHeight: '10',
		},
		h3: {
			fontSize: '2xl',
			lineHeight: '8',
		},
		h4: {
			fontSize: 'md',
			lineHeight: '6',
		},
		h5: {
			fontSize: 'sm',
			lineHeight: '5',
		},
	},
	defaultProps: {
		variant: 'h3',
	},
};
