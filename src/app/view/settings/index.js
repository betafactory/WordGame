import React from 'react';
import './index.css';
import {
    Jumbotron,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Badge,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import Navigation from '../../component/navigation';
import Footer from "../../component/footer";
import {reactLocalStorage} from 'reactjs-localstorage';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: true,
        user_name: "Wordgame User",
        bio: "Scribble something about yourself.",
        selected_enrollments: [],
        selected_focus: "general",
        enrollment: [],
        categories: [],
        focus: null,
        learnt: 0
    }

    componentDidMount() {
        this.fetchProfile()
    }

    saveProfile = () => {
        if(reactLocalStorage.get("token", false) === false) {
            window.location = "/"
        } else {
            const data = new FormData()
            data.append('name', this.state.user_name)
            data.append('bio', this.state.bio)
            data.append('categories', this.state.selected_enrollments)
            data.append('focus', this.state.selected_focus)
            fetch(process.env.REACT_APP_BETAFACTORY_SERVICE_URL + '/api/profile/edit?token=' + reactLocalStorage.get("token"), {
                method: "post",
                body: data
            }).then(res => res.json())
                .then((data) => {
                    if (data["success"] === true) {
                        window.location = "/profile"
                    } else {
                        console.log(data)
                    }
                })
                .catch(console.log)
        }
    }

    handleUserNameChange = (e) => {
        this.setState({user_name: e.target.value})
    }

    handleBioChange = (e) => {
        this.setState({bio: e.target.value})
    }

    handleEnrollmentChange = (e) => {
        let options = e.target.selectedOptions
        let selected_enrollments = []
        for (var i = 0, l = options.length; i < l; i++) {
            selected_enrollments.push(options[i].value)
        }
        this.setState({selected_enrollments: selected_enrollments})
    }

    handleFocusChange = (e) => {
        this.setState({selected_focus: e.target.value})
    }

    getOptedCategories = () => {
        let options = []
        {this.state.categories.map((category, result) => {
            let selected = this.state.enrollment.some(el => el["name"] === category["name"])
            options.push(<option selected={selected} value={category["slug"]}>{category["name"]}</option>)
        })}
        return (
            <FormGroup>
                <Label for="exampleSelectMulti">Categories</Label>
                <Input type="select" multiple onChange={this.handleEnrollmentChange}>
                    {options}
                </Input>
            </FormGroup>
        )
    }

    getFocusOptions = () => {
        let options = []
        {this.state.enrollment.map((category, result) => {
            let selected = this.state.focus["name"] == category["name"]
            options.push(<option selected={selected} value={category["slug"]}>{category["name"]}</option>)
        })}
        return (
            <FormGroup>
                <Label>Focus</Label>
                <Input type="select" onChange={this.handleFocusChange}>
                    {options}
                </Input>
            </FormGroup>
        )
    }

    fetchProfile = () => {
        if(reactLocalStorage.get("token", false) === false) {
            window.location = "/"
        } else {
            fetch(process.env.REACT_APP_BETAFACTORY_SERVICE_URL + "/api/profile/view?token=" + reactLocalStorage.get("token"))
                .then(res => res.json())
                .then((data) => {
                    if(data["success"]) {
                        let selected_enrollments = []
                        data["enrollment"].every(enrollment => selected_enrollments.push(enrollment["slug"]))
                        this.setState({
                            loading: false,
                            user_name: data["name"],
                            bio: data["bio"],
                            enrollment: data["enrollment"],
                            categories: data["categories"],
                            focus: data["focus"],
                            learnt: data["learnt"],
                            selected_enrollments: selected_enrollments,
                            selected_focus: data["focus"]["slug"]
                        })
                    } else {
                        window.location = "/"
                    }
                })
                .catch((response) => {
                    console.log(response)
                    window.location = "/"
                })
        }
    }

    render() {
        return (
            <div>
                <Jumbotron className="app-header">
                    <div class="container">
                        <Navigation></Navigation>
                    </div>
                </Jumbotron>
                <div className="container">
                    {this.state.loading ?
                        (<div>
                            <img className="edit-profile-loader" src="/profile-loading.gif"/>
                        </div>):(<div>
                        <div>
                            <Breadcrumb tag="nav" listTag="div">
                                <BreadcrumbItem tag="span">Home</BreadcrumbItem>
                                <BreadcrumbItem active tag="span">Settings</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <Jumbotron className="settings-user-image-box">
                                    <img src="/profile.jpg" class="profile-user-image"/>
                                </Jumbotron>
                            </div>
                            <div className="col-md-9">
                                <Jumbotron className="profile-edit-form">
                                    <Form>
                                        <FormGroup>
                                            <Label for="name">Name</Label>
                                            <Input placeholder={this.state.user_name} onChange={this.handleUserNameChange}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="bio">Bio</Label>
                                            <Input placeholder={this.state.bio} onChange={this.handleBioChange} />
                                        </FormGroup>
                                        {this.getOptedCategories()}
                                        {this.getFocusOptions()}
                                    </Form>
                                    <Button className="profile-save-button btn-block" onClick={() => this.saveProfile()}>Save Profile</Button>
                                </Jumbotron>
                                {/*<Jumbotron className="profile-user-name">*/}
                                {/*    <h1>{this.state.user_name}</h1>*/}
                                {/*    <h4>{this.state.bio}</h4>*/}
                                {/*    <h4><Badge color="warning"><b>Words learnt so far: </b>{this.state.learnt}</Badge></h4>*/}
                                {/*    <h4><Badge color="warning"><b>Enrollment: </b>{this.state.enrollment.join(', ')}</Badge></h4>*/}
                                {/*    <h4><Badge color="warning"><b>Focus: </b>{this.state.focus}</Badge></h4>*/}
                                {/*</Jumbotron>*/}
                            </div>
                        </div>
                    </div>)}
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
