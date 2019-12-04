import React from 'react';
import './index.css';
import {
    Jumbotron,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Badge,
    Spinner
} from 'reactstrap';
import {
    Doughnut,
    Line
} from 'react-chartjs-2';
import Navigation from '../../component/navigation';
import Footer from "../../component/footer";
import {reactLocalStorage} from 'reactjs-localstorage';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: true,
        user_name: "Wordgame User",
        bio: "Scribble something about yourself.",
        enrollment: [],
        focus: null,
        learnt: 0,
        options: {
            responsive: true,
            tooltips: {
                mode: 'label'
            },
            hover: {
                mode: 'dataset'
            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            show: true,
                            labelString: 'Month'
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            show: true,
                            labelString: 'Value'
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }
                ]
            }
        },
        data: {
            labels: [],
            datasets: []
        }
    }

    componentDidMount() {
        this.fetchProfile()
    }

    fetchProfile = () => {
        if(reactLocalStorage.get("token", false) === false) {
            window.location = "/"
        } else {
            fetch(process.env.REACT_APP_BETAFACTORY_SERVICE_URL + "/api/profile/view?token=" + reactLocalStorage.get("token"))
                .then(res => res.json())
                .then((data) => {
                    if(data["success"]) {
                       let enrollments = []
                       data["enrollment"].every(enrollment => enrollments.push(enrollment["name"]))
                       this.setState({
                           loading: false,
                           user_name: data["name"],
                           bio: data["bio"],
                           enrollment: enrollments,
                           focus: data["focus"]["name"],
                           learnt: data["learnt"],
                           data: {
                               ...this.state.data,
                               labels: data["progress"]["overall"]["baseline"]["labels"],
                               datasets: [
                                   {
                                       label: 'Seen',
                                       fill: true,
                                       lineTension: 0.1,
                                       backgroundColor: 'rgba(75,192,192,0.4)',
                                       borderColor: 'rgba(75,192,192,1)',
                                       borderCapStyle: 'butt',
                                       borderDash: [],
                                       borderDashOffset: 0.0,
                                       borderJoinStyle: 'miter',
                                       pointBorderColor: 'rgba(75,192,192,1)',
                                       pointBackgroundColor: '#fff',
                                       pointBorderWidth: 1,
                                       pointHoverRadius: 5,
                                       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                       pointHoverBorderColor: 'rgba(220,220,220,1)',
                                       pointHoverBorderWidth: 2,
                                       pointRadius: 1,
                                       pointHitRadius: 10,
                                       data: data["progress"]["overall"]["baseline"]["data"]
                                   },
                                   {
                                       label: 'Novice',
                                       fill: false,
                                       lineTension: 0.1,
                                       backgroundColor: 'rgba(75,192,192,0.4)',
                                       borderColor: 'rgba(255,0,0,1)',
                                       borderCapStyle: 'butt',
                                       borderDash: [5, 5],
                                       borderDashOffset: 0.0,
                                       borderJoinStyle: 'miter',
                                       pointBorderColor: 'rgba(75,192,192,1)',
                                       pointBackgroundColor: '#fff',
                                       pointBorderWidth: 1,
                                       pointHoverRadius: 5,
                                       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                       pointHoverBorderColor: 'rgba(220,220,220,1)',
                                       pointHoverBorderWidth: 2,
                                       pointRadius: 1,
                                       pointHitRadius: 10,
                                       data: data["progress"]["overall"]["novice"]["data"]
                                   },
                                   {
                                       label: 'Intermediate',
                                       fill: false,
                                       lineTension: 0.1,
                                       backgroundColor: 'rgba(75,192,192,0.4)',
                                       borderColor: 'rgba(255,165,0,1)',
                                       borderCapStyle: 'butt',
                                       borderDash: [5, 5],
                                       borderDashOffset: 0.0,
                                       borderJoinStyle: 'miter',
                                       pointBorderColor: 'rgba(75,192,192,1)',
                                       pointBackgroundColor: '#fff',
                                       pointBorderWidth: 1,
                                       pointHoverRadius: 5,
                                       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                       pointHoverBorderColor: 'rgba(220,220,220,1)',
                                       pointHoverBorderWidth: 2,
                                       pointRadius: 1,
                                       pointHitRadius: 10,
                                       data: data["progress"]["overall"]["intermediate"]["data"]
                                   },
                                   {
                                       label: 'Expert',
                                       fill: false,
                                       lineTension: 0.1,
                                       backgroundColor: 'rgba(75,192,192,0.4)',
                                       borderColor: 'rgba(50,205,50,1)',
                                       borderCapStyle: 'butt',
                                       borderDash: [5, 5],
                                       borderDashOffset: 0.0,
                                       borderJoinStyle: 'miter',
                                       pointBorderColor: 'rgba(75,192,192,1)',
                                       pointBackgroundColor: '#fff',
                                       pointBorderWidth: 1,
                                       pointHoverRadius: 5,
                                       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                       pointHoverBorderColor: 'rgba(220,220,220,1)',
                                       pointHoverBorderWidth: 2,
                                       pointRadius: 1,
                                       pointHitRadius: 10,
                                       data: data["progress"]["overall"]["expert"]["data"]
                                   }
                               ]
                           }
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

    getGranularProgress = () => {
        return (
            <div className="row progress-container">
                <div className="col-md-4">
                    <Doughnut data={this.state.data} width={300} height={300} options={this.state.options} />
                </div>
                <div className="col-md-4">
                    <Doughnut data={this.state.data} width={300} height={300} options={this.state.options} />
                </div>
                <div className="col-md-4">
                    <Doughnut data={this.state.data} width={300} height={300} options={this.state.options} />
                </div>
            </div>
        )
    }

    getProgress = () => {
        return (
            <div className="row progress-container">
                <div className="col-md-12">
                    <Line data={this.state.data} options={this.state.options} />
                </div>
            </div>
        )
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
                                <img className="profile-loader" src="/profile-loading.gif"/>
                            </div>):
                            (<div>
                                <div>
                                    <Breadcrumb tag="nav" listTag="div">
                                        <BreadcrumbItem tag="span">Home</BreadcrumbItem>
                                        <BreadcrumbItem active tag="span">Profile</BreadcrumbItem>
                                    </Breadcrumb>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <Jumbotron className="profile-user-image-box">
                                            <img src="/profile.jpg" class="profile-user-image"/>
                                            <Button className="profile-edit-button btn-block" href="/settings">Edit Profile</Button>
                                        </Jumbotron>
                                    </div>
                                    <div className="col-md-9">
                                        <Jumbotron className="profile-user-name">
                                            <h1>{this.state.user_name}</h1>
                                            <h4>{this.state.bio}</h4>
                                            <h4><Badge color="warning"><b>Words learnt so far: </b>{this.state.learnt}</Badge></h4>
                                            <h4><Badge color="warning"><b>Categories: </b>{this.state.enrollment.join(', ')}</Badge></h4>
                                            <h4><Badge color="warning"><b>Focus: </b>{this.state.focus}</Badge></h4>
                                        </Jumbotron>
                                    </div>
                                </div>
                                {/*<div>*/}
                                {/*    <Breadcrumb tag="nav" listTag="div">*/}
                                {/*        <BreadcrumbItem tag="span">Challenge</BreadcrumbItem>*/}
                                {/*        <BreadcrumbItem active tag="span">Granular Progress Series</BreadcrumbItem>*/}
                                {/*    </Breadcrumb>*/}
                                {/*</div>*/}
                                {/*{this.getGranularProgress()}*/}
                                <div>
                                    <Breadcrumb tag="nav" listTag="div">
                                        <BreadcrumbItem tag="span">Challenge</BreadcrumbItem>
                                        <BreadcrumbItem active tag="span">Overall Progress Series</BreadcrumbItem>
                                    </Breadcrumb>
                                </div>
                                {this.getProgress()}
                            </div>)}
                    </div>
                <Footer></Footer>
            </div>
        );
    }
}
