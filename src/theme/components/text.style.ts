// eslint-disable-next-line import/no-anonymous-default-export
export default {
	baseStyle: {
		fontFamily: 'heading',
		fontWeight: 'normal',
	},
	variants: {
		body: {
			fontSize: 'sm',
			lineHeight: '5',
			fontWeight: 'medium',
		},
		paragraph: {
			fontSize: 'md',
			lineHeight: '6',
		},
		paragraphMedium: {
			fontSize: '0.95rem',
			lineHeight: '1.4rem',
		},
		paragraphSmall: {
			fontSize: 'sm',
			lineHeight: '5',
		},
		xSmall: {
			fontSize: 'xs',
			lineHeight: '4',
		},
		xTiny: {
			fontSize: '2xs',
			lineHeight: '3',
		},
	},
	defaultProps: {
		variant: 'paragraph',
	},
};
