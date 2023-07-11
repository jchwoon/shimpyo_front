import styled from "@emotion/styled"
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { forwardRef, useCallback, useState, ChangeEvent, FocusEvent, ReactElement } from 'react';
import FormHelperText from '@mui/material/FormHelperText';

interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
    type: string
    placeholder: string,
    error?: boolean;
    errorMessage?: string | ReactElement;
    value?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

// export default function CustomizedTextField({ type, placeholder, error, errorMessage, value, onChange, onBlur }: TextFieldProps) {

//     const [showPassword, setShowPassword] = useState(false);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();
//     };

//     return (
//         type === "password" ?
//             <StyledFormControl sx={{ m: 1, width: '100%' }} variant="outlined">
//                 <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
//                 <OutlinedInput
//                     id="outlined-adornment-password"
//                     type={showPassword ? 'text' : 'password'}
//                     endAdornment={
//                         <InputAdornment position="end">
//                             <IconButton
//                                 aria-label="toggle password visibility"
//                                 onClick={handleClickShowPassword}
//                                 onMouseDown={handleMouseDownPassword}
//                                 edge="end"
//                             >
//                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                             </IconButton>
//                         </InputAdornment>
//                     }
//                     label="password"
//                 />
//             </StyledFormControl>
//             :
//             <StyledTextfield
//                 variant="outlined"
//                 label={placeholder}
//                 error={error}
//                 helperText={errorMessage}
//                 value={value}
//                 onChange={onChange}
//                 onBlur={onBlur}
//             />

//     )
// }

const Input = forwardRef<HTMLInputElement, TextFieldProps>(
    function CustomizedTextField({ type, placeholder, error, errorMessage, value, onChange, onBlur }, ref) {

        const [showPassword, setShowPassword] = useState(false);

        const handleClickShowPassword = () => setShowPassword((show) => !show);

        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        };

        return (
            type === "password" ?
                <StyledFormControl sx={{ m: 1, width: '100%' }} variant="outlined" error={error}>
                    <InputLabel htmlFor="outlined-adornment-password" sx={{ backgroundColor: "white" }}>{placeholder}</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="password"
                        value={value}
                        error={error}
                        onChange={onChange}
                        onBlur={onBlur}
                        inputRef={ref}
                    />
                    {error && <FormHelperText error>{errorMessage}</FormHelperText>}
                </StyledFormControl>
                :
                <StyledTextfield
                    variant="outlined"
                    label={placeholder}
                    error={error}
                    helperText={errorMessage}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                />

        )
    }
)

const StyledTextfield = styled(TextField) <{ error: boolean | undefined }>`
margin-top:10px;
width:100%;
.MuiInputLabel-root.Mui-focused {
    ${props => props.error ? 'color: #d32f2f' : 'color: #00adb5'}
  }
.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    ${props => props.error ? 'border-color: #d32f2f' : 'border-color: #00adb5'}
  }
`

const StyledFormControl = styled(FormControl) <{ error: boolean | undefined }>`
margin-top:10px;
.MuiInputLabel-root.Mui-focused {
    ${props => props.error ? 'color: #d32f2f' : 'color: #00adb5'}
  }
.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    ${props => props.error ? 'border-color: #d32f2f' : 'border-color: #00adb5'}
  }
margin-left:0px;
`

export default Input;