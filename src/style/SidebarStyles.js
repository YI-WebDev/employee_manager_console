import { styled, keyframes } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';

const lightAnimation = keyframes`
  100% {
    outline-color: silver;
    outline-offset: 12px;
  }
`;

export const textStyled = styled(RouterLink)({
    textDecoration: 'none',
    fontSize: '20px',
    color: 'inherit',
    transition: '.3s',
    outline: '0.5px solid',
    outlineColor: 'white',
    outlineOffset: '0px',
    ":hover": {
        animation: `${lightAnimation} .5s infinite alternate`,
    },
});