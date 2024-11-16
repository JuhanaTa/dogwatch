import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, Checkbox, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../reducers/UserReducer';

function RegisterForm({ setShowRegister }) {
    const navigate = useNavigate();
    const { userLoading, userError } = useSelector((state) => state.user)
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [roleChecked, setRoleChecked] = useState([false, false]);


    const handleFirstname = (event) => setFirstname(event.target.value);
    const handleLastname = (event) => setLastname(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    const handleRePassword = (event) => setRePassword(event.target.value);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPass = () => setShowConfirmPass((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleChangeSitter = (event) => {
        setRoleChecked([!roleChecked[0], roleChecked[1]]);
    };

    const handleChangeOwner = (event) => {
        setRoleChecked([roleChecked[0], !roleChecked[1]]);
    };

    const handleRegister = (event) => {
        event.preventDefault();

        let credentials = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            role: roleChecked[0] ? 'sitter' : 'owner',
        }

        dispatch(userRegister(credentials)).then((result) => {
            if (result.payload) {
                navigate(`/`)
            }
        })
    }

    return (

        <Box sx={{ width: '100%', height: '80vh', position: 'relative' }}>

            <Box sx={{
                width: '45vw',
                maxWidth: 700,
                backgroundColor: 'background.paper',
                position: 'absolute',
                top: '50%',
                left: '15%',
                transform: 'translate(-10%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                p: 4
            }}>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 2
                }}>
                    <Typography variant="h4" sx={{ color: 'text.primary', p: 1 }}>Create your account</Typography>

                    <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ flex: 1, mr: 1 }}>
                            <TextField
                                id="name-input"
                                label="First name"
                                variant="outlined"
                                value={firstname}
                                onChange={handleFirstname}
                            />
                        </FormControl>

                        <FormControl sx={{ flex: 1, ml: 1 }}>
                            <TextField
                                id="lastname-input"
                                label="Last name"
                                variant="outlined"
                                value={lastname}
                                onChange={handleLastname}
                            />
                        </FormControl>
                    </Box>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            type='email'
                            id="email-input"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={handleEmail}
                        />
                    </FormControl>


                    <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ flex: 1, mr: 1 }} variant="outlined">
                            <InputLabel>Create Password</InputLabel>
                            <OutlinedInput
                                id="outlined-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Create Password"
                            />
                        </FormControl>


                        <FormControl sx={{ flex: 1, ml: 1 }} variant="outlined">
                            <InputLabel>Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-reenter-password"
                                type={showConfirmPass ? 'text' : 'password'}
                                value={rePassword}
                                onChange={handleRePassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showConfirmPass ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowConfirmPass}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showConfirmPass ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ width: '100%', display: 'flex', gap: 2, flexWrap: 'wrap' }}>

                        <Typography variant="p" sx={{ color: 'text.primary', p: 1 }}>Choose your role:</Typography>

                        <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                            <FormControlLabel
                                label="Dog sitter"
                                control={<Checkbox checked={roleChecked[0]} onChange={handleChangeSitter} />}
                            />
                            <FormControlLabel
                                label="Dog owner"
                                control={<Checkbox checked={roleChecked[1]} onChange={handleChangeOwner} />}
                            />
                        </FormGroup>

                    </Box>


                    {userLoading ?
                        <CircularProgress />
                        :
                        <Button sx={{ width: 175 }} onClick={handleRegister} variant="contained">Create Account</Button>
                    }

                    {userError && (
                        <Typography variant='p'>Register failed</Typography>
                    )}

                    <Typography variant="p" sx={{ color: 'text.primary', p: 1 }}>
                        Have you already created an account?{" "}
                        <Link onClick={() => setShowRegister(false)} color="inherit">
                            Sign in instead!
                        </Link>
                    </Typography>
                </Box>
            </Box>

        </Box>

    )
}

export default RegisterForm