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

const styles = (theme) =>({
    ...theme.spreadThis
})


class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        }
    }
    handleSubmit =(event) =>{
        event.preventDefault();
        this.setState({
            loading: true
        })
        const newUserData ={ //fields that user enters to signup 
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        axios.post('/signup', newUserData)
            .then(res =>{
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`) //store token in local storage
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
                        Signup
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
                        <TextField id = "confirmPassword" name = "confirmPassword" type ="password" label= "Confirm Password" className={classes.textField}
                            helperText={errors.confirmPassword} //helps display errors when logging in password
                            error = {errors.confirmPassword ? true: false}
                            value = {this.state.confirmPassword} onChange={this.handleChange} fullWidth/>
                        <TextField id = "handle" name = "handle" type ="text" label= "Handle" className={classes.textField}
                            helperText={errors.handle} //helps display errors when logging in password
                            error = {errors.handle ? true: false}
                            value = {this.state.handle} onChange={this.handleChange} fullWidth/> 
                        {errors.general && ( //renders if we have general error from back end (wrong credentials)
                            <Typography variant ="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type ="submit" variant ="contained" color="primary" className = {classes.button} disabled = {loading}>
                            Signup {loading &&(
                                <CircularProgress size ={30} className = {classes.progress} />
                            )}
                            </Button>
                        <br />
                        <br />
                        <br />
                        <small className = {classes.signup}> Already have an account? Login <Link to ="/login">Here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

signup.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup)