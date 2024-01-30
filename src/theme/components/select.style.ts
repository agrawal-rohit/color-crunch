import inputStyle from './input.style';
import { mergeWith } from '@chakra-ui/utils';

const iconSpacing = { paddingInlineEnd: '2rem' };

const selectStyle = {
	parts: ['icon', 'field'],
	baseStyle: {
		field: {
			...(inputStyle.baseStyle as any).field,
			bg: 'white',
			appearance: 'none',
			paddingBottom: '1px',
			lineHeight: 'normal',
			'> option, > optgroup': {
				bg: 'white',
			},
			_disabled: {
				opacity: 0.6,
				cursor: 'not-allowed',
			},
		},
		icon: {
			width: '1.5rem',
			height: '100%',
			insetEnd: '0.5rem',
			position: 'relative',
			color: 'currentColor',
			fontSize: '1.25rem',
			_disabled: {
				opacity: 0.7,
			},
		},
	},

	sizes: mergeWith({}, inputStyle.sizes, {
		lg: {
			field: iconSpacing,
		},
		md: {
			field: iconSpacing,
		},
		sm: {
			field: iconSpacing,
		},
		xs: {
			field: iconSpacing,
			icon: { insetEnd: '0.25rem' },
		},
	}),

	variants: inputStyle.variants,

	defaultProps: {
		size: 'md',
		variant: 'filled',
	},
};

export default selectStyle;
