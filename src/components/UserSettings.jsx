import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Card, Checkbox, CircularProgress, Container, FormControl, FormControlLabel, FormGroup, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfilePhoto from '../assets/sitter4.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { userEdit } from '../reducers/UserReducer';

function UserSettings() {
    const { user, userLoading, userError } = useSelector((state) => state.user)
    const [firstname, setFirstname] = useState(user.firstname)
    const [lastname, setLastname] = useState(user.lastname)
    const [email, setEmail] = useState(user.email)
    const [curPassword, setCurPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [desc, setDesc] = useState(user.desc)
    const [service, setService] = useState([false, false, false]);


    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleFirstname = (event) => setFirstname(event.target.value);
    const handleLastname = (event) => setLastname(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handleDesc = (event) => setDesc(event.target.value);

    const handleCurPassword = (event) => setCurPassword(event.target.value);
    const handleNewPassword = (event) => setNewPassword(event.target.value);
    const handleConfirmPassword = (event) => setConfirmPassword(event.target.value);

    const handleDogWalking = (event) => {
        setService([!service[0], service[1], service[2]]);
    };

    const handleHouseSitting = (event) => {
        setService([service[0], !service[1], service[2]]);
    };

    const handleDaycare = (event) => {
        setService([service[0], service[1], !service[2]]);
    };

    const handleSettingsSave = () => {

        let newCredentials = {
            firstname: firstname,
            lastname: lastname,
            desc: desc,
            email: email,
            password: user.password,
            role: 'owner'
        }

        dispatch(userEdit(newCredentials)).then((result) => {
            if (result.payload) {
                navigate(`/profile`)
            }
        })
    }


    return (

        <Box
            sx={{
                width: '90vw',
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2,
                alignItems: 'start'
            }}>

            <Typography variant='h4'>Account settings</Typography>


            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    flexWrap: 'wrap',
                    gap: 2
                }}
            >

                <Card sx={{
                    p: 4,
                    flexDirection: 'column',
                    display: 'flex',
                    maxWidth: 400,
                    minWidth: 280,
                    flex: 1
                }}>
                    <img src={ProfilePhoto} />
                    <Typography variant='p'>Image size should be under 1MB and image ration needs to be 1:1</Typography>
                </Card>


                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    flex: 2,
                    minWidth: 300
                }}>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="name-input"
                            label="First name"
                            variant="outlined"
                            value={firstname}
                            onChange={(e) => { handleFirstname(e) }}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="lastname-input"
                            label="Last name"
                            variant="outlined"
                            value={lastname}
                            onChange={(e) => { handleLastname(e) }}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="email-input"
                            label="Email address"
                            variant="outlined"
                            value={email}
                            onChange={(e) => { handleEmail(e) }}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="desc-input"
                            label="Your title or other description"
                            variant="outlined"
                            value={desc}
                            onChange={(e) => { handleDesc(e) }}
                        />
                    </FormControl>



                    {userLoading ?
                        <CircularProgress />
                        :
                        <Button sx={{ width: 175 }} onClick={() => { handleSettingsSave() }} variant="contained">Save Changes</Button>
                    }

                    {userError && (
                        <Typography variant='p'>Changing settings failed</Typography>
                    )}

                </Box>

            </Box>



            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                flex: 1,
                width: '100%',
                maxWidth: 1000,
                flexWrap: 'wrap'
            }}>


                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        alignItems: 'start',
                        minWidth: 200
                    }}
                >

                    <Typography variant='h6'>Services</Typography>

                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={service[0]} onChange={handleDogWalking} name="Dog walking" />
                            }
                            label="Dog walking"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={service[1]} onChange={handleHouseSitting} name="Dog sitting" />
                            }
                            label="Dog sitting"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={service[2]} onChange={handleDaycare} name="Daycare" />
                            }
                            label="Daycare"
                        />
                    </FormGroup>

                    {userLoading ?
                        <CircularProgress />
                        :
                        <Button sx={{ width: 175 }} onClick={() => { handleSettingsSave() }} variant="contained">Save Services</Button>
                    }

                    {userError && (
                        <Typography variant='p'>Changing settings failed</Typography>
                    )}

                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        flex: 1,
                        alignItems: 'start',
                        maxWidth: 500,
                        minWidth: 300
                    }}
                >

                    <Typography variant='h6'>Change password</Typography>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="cur-pass-input"
                            label="Current password"
                            variant="outlined"
                            value={curPassword}
                            onChange={(e) => { handleFirstname(e) }}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="new-pass-input"
                            label="New password"
                            variant="outlined"
                            value={newPassword}
                            onChange={(e) => { handleLastname(e) }}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id="confirm-pass-input"
                            label="Confirm new password"
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => { handleEmail(e) }}
                        />
                    </FormControl>

                    {userLoading ?
                        <CircularProgress />
                        :
                        <Button sx={{ width: 175 }} onClick={() => { handleSettingsSave() }} variant="contained">Save Password</Button>
                    }

                    {userError && (
                        <Typography variant='p'>Changing settings failed</Typography>
                    )}
                </Box>


            </Box>



        </Box>

    )
}

export default UserSettings