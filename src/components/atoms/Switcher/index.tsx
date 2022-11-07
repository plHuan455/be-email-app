import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

interface StyledSwitchProps {
    width?: number,
    // height?: number,
    colorChecked?: TAppColors,
    colorCheckedHover?: TAppColors,
    onChange?: (((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) & ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)) | undefined
}

const CustomSwitcher = styled(Switch, {
    shouldForwardProp: (prop) => true,
})<StyledSwitchProps>(({ width = 120, theme }) => ({
    width: `${width}px`,
    height: '55px',
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: pink[600],
        '&:hover': {
            backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: pink[600],
    },
    '& .css-qle1lc-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked': {
        transform: `translateX(${width - 50}px)`,
    },
    '& .css-qle1lc-MuiButtonBase-root-MuiSwitch-switchBase': {
        left: '-2px',
    },
    '& .MuiSwitch-thumb': {
        width: '36px',
        height: '36px'
    },

}));

const label = { inputProps: { 'aria-label': 'controlled' } };

export default function Switcher(props: StyledSwitchProps) {
    return <CustomSwitcher
        {...label}
        defaultValue={30}
        width={props.width}
        onChange={props.onChange}
    />;
}
