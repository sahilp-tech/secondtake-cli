//component for users to edit thier detials (bio, team, location, etc.)

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

//Redux
import { connect } from 'react-redux'
import {editUserDetails} from '../redux/actions/userActions'

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToolTip from '@material-ui/core/Tooltip'
import IconButtom from '@material-ui/core/IconButton'
import Settings from '@material-ui/icons/Settings'

const styles =(theme) =>({
    ...theme.spread,
    button: {
        float: 'right'
    }
})
class EditDetails extends Component {
    state ={
        bio: '',
        location: '',
        website: '',
        team: '',
        open: false
    }
    mapUserDetailsToState = (credentials) =>{
        this.setState({ //if info is present, print it; else leave it blank
            bio: credentials.bio ? credentials.bio: '',
            location: credentials.location ? credentials.location: '',
            website: credentials.website ? credentials.website: '',
            team: credentials.team ? credentials.team: '' 

        })
    }
    handleOpen = () =>{
        this.setState({open: true})
        this.mapUserDetailsToState(this.props.credentials)
    }
    handleClose = () =>{
        this.setState({open: false})
    }

    componentDidMount(){ //gives the entered info for details prior to editing
        const {credentials} = this.props;
        this.mapUserDetailsToState(credentials)
        
    } 
    
    handleChange = (event) => {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit =() =>{
        const userDetails ={
            bio: this.state.bio,
            location: this.state.location,
            website: this.state.website,
            team: this.state.team

        }
        this.props.editUserDetails(userDetails)
        this.handleClose();
    }
    render() {
        const {classes}= this.props
        return (
            <Fragment>
                <ToolTip title ="Edit User Details">
                    <IconButtom onClick={this.handleOpen} className={classes.button}>
                        <Settings color ="primary" />
                    </IconButtom>
                </ToolTip>
                <Dialog 
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Edit Your Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField 
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="A short bio about yourself"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth/>
                            <TextField 
                                name="location"
                                type="text"
                                label="Location"
                                multiline
                                placeholder="Where You're From"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth/>
                            <TextField 
                                name="website"
                                type="text"
                                label="Website"
                                multiline
                                placeholder="Your Personal Website"
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth/>
                            <TextField 
                                name="team"
                                type="text"
                                label="Team"
                                multiline
                                placeholder="Your Favorite Sports Team"
                                className={classes.textField}
                                value={this.state.team}
                                onChange={this.handleChange}
                                fullWidth/>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes ={
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const MapStateToProps = (state) =>({
    credentials: state.user.credentials
})

export default connect(MapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails))
