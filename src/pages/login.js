import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import axios from 'axios'
import {Link} from 'react-router-dom'
//Material UI imports
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = {
    form:{
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto',
        width: '150px'
    },
    pageTitle: {
        margin: '10px auto 10px auto',
    },
    textField :{
        margin: '10px auto 10px auto',
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    customError:{
        color: 'red',
        fontSize: '1rem',
        marginTop: 10
    },
    progress:{
        position: 'absolute'
    },
    signup: {
        fontSize: '20px'
    }
}


class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }
    handleSubmit =(event) =>{
        event.preventDefault();
        this.setState({
            loading: true
        })
        const userData ={
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData)
            .then(res =>{
                console.log(res.data);
                this.setState({
                    loading: false
                })
                this.props.history.push('/');
            })
            .catch (err =>{
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })
    }
    handleChange = (event) => {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const {classes} = this.props;
        const {errors, loading} = this.state
        return (
            <Grid container className ={classes.form}>
                <Grid item sm />
                <Grid item sm> 
                    <img src={AppIcon} alt="debate image" className ={classes.image}/>
                    <Typography variant="h3" className = {classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id = "email" name = "email" type ="email" label= "Email" 
                            className={classes.textField}
                            helperText={errors.email} //helps display errors when logging in email
                            error = {errors.email ? true: false}
                            value = {this.state.email} onChange={this.handleChange} fullWidth/>
                        <TextField id = "password" name = "password" type ="password" label= "Password" className={classes.textField}
                            helperText={errors.password} //helps display errors when logging in password
                            error = {errors.password ? true: false}
                            value = {this.state.password} onChange={this.handleChange} fullWidth/>
                        {errors.general && ( //renders if we have general error from back end (wrong credentials)
                            <Typography variant ="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type ="submit" variant ="contained" color="primary" className = {classes.button} disabled = {loading}>
                            Login {loading &&(
                                <CircularProgress size ={30} className = {classes.progress} />
                            )}
                            </Button>
                        <br />
                        <br />
                        <br />
                        <small className = {classes.signup}> Don't have an Account? Be a part of the debate! Sign up <Link to ="/signup">Here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)