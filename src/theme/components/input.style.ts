import { ComponentMultiStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const inputStyle: ComponentMultiStyleConfig = {
	parts: ['element', 'field', 'addon'],
	baseStyle: {
		field: {
			width: '100%',
			minWidth: 0,
			outline: 0,
			position: 'relative',
			appearance: 'none',
			transitionProperty: 'common',
			transitionDuration: 'normal',
		},
	},
	sizes: {
		lg: {
			field: { fontSize: 'lg', px: 4, h: 12, borderRadius: 'md' },
			addon: { fontSize: 'lg', px: 4, h: 12, borderRadius: 'md' },
		},
		md: {
			field: {
				fontSize: 'md',
				px: 4,
				h: 10,
				borderRadius: 'md',
			},
			addon: {
				fontSize: 'md',
				px: 4,
				h: 10,
				borderRadius: 'md',
			},
		},
		sm: {
			field: {
				fontSize: 'sm',
				px: 3,
				h: '2.15rem',
				borderRadius: 'md',
			},
			addon: {
				fontSize: 'sm',
				px: 3,
				h: '2.15rem',
				borderRadius: 'md',
			},
		},
		xs: {
			field: {
				fontSize: 'xs',
				px: 2,
				h: 6,
				borderRadius: 'md',
			},
			addon: {
				fontSize: 'xs',
				px: 2,
				h: 6,
				borderRadius: 'md',
			},
		},
	},

	variants: {
		filled: (props) => {
			return {
				field: {
					border: '1px solid',
					borderColor: 'neutral.200',
					bg: mode('neutral.100', 'neutral.800')(props),
					_hover: {
						bg: mode('neutral.200', 'neutral.900')(props),
					},
					_readOnly: {
						boxShadow: 'none !important',
						userSelect: 'all',
					},
					_disabled: {
						opacity: 0.6,
						cursor: 'not-allowed',
					},
					_invalid: {
						borderColor: mode('danger.500', 'danger.300')(props),
					},
					_focus: {
						bg: 'white',
						borderColor: mode('primary.500', 'primary.300')(props),
					},
				},
				addon: {
					border: '2px solid',
					borderColor: 'transparent',
					bg: mode('neutral.200', 'neutral.800')(props),
				},
			};
		},
		outline: (props) => {
			return {
				field: {
					border: '1px solid',
					borderColor: 'neutral.300',
					bg: 'transparent',
					_hover: {
						borderColor: mode('neutral.400', 'neutral.50')(props),
					},
					_readOnly: {
						boxShadow: 'none !important',
						userSelect: 'all',
					},
					_disabled: {
						opacity: 0.6,
						cursor: 'not-allowed',
					},
					_invalid: {
						borderColor: mode('danger.500', 'danger.300')(props),
					},
					_focus: {
						zIndex: 1,
						borderColor: mode('primary.500', 'primary.300')(props),
						boxShadow: 'none',
					},
				},

				addon: {
					border: '2px solid',
					borderColor: mode('inherit', 'neutral.50')(props),
					bg: 'transparent',
				},
			};
		},
		flushed: (props) => {
			return {
				field: {
					borderBottom: '1px solid',
					borderColor: 'neutral.300',
					borderRadius: '0',
					px: '0',
					bg: 'transparent',
					_readOnly: {
						boxShadow: 'none !important',
						userSelect: 'all',
					},
					_invalid: {
						borderColor: mode('neutral.400', 'neutral.50')(props),
						boxShadow: `0px 1px 0px 0px ${mode(
							'neutral.400',
							'neutral.50'
						)(props)}`,
					},
					_focusVisible: {
						borderColor: mode('primary.500', 'primary.50')(props),
						boxShadow: `0px 1px 0px 0px ${mode(
							'primary.500',
							'primary.50'
						)(props)}`,
					},
				},
				addon: {
					borderBottom: '2px solid',
					borderColor: 'neutral.400',
					borderRadius: '0',
					px: '0',
					bg: 'transparent',
				},
			};
		},
		unstyled: {
			field: {
				bg: 'transparent',
				px: 0,
				height: 'auto',
			},
			addon: {
				bg: 'transparent',
				px: 0,
				height: 'auto',
			},
		},
	},

	defaultProps: {
		size: 'md',
		variant: 'filled',
	},
};

export default inputStyle;
