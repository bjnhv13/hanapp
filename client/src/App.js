import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/navbar';
import Login from './components/login';
import Settings from './components/settings';
import PatientsList from './components/patients-list';
import CreatePatient from './components/create-patient';
import Patient from './components/Patient';
import Error from './components/error';

import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			login: true, //need to change to false before production
			userID: "123",
			userName: "נסיון",
			userPic: "",
			userEmail:"",
			loading: false,
			patientId: "",
			appTitle: "hanApp",
		}
		this.handleLogin = this.handleLogin.bind(this);
		this.startLoading = this.startLoading.bind(this);
		this.stopLoading = this.stopLoading.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.enterPetientDetails = this.enterPetientDetails.bind(this);
		this.setTitle = this.setTitle.bind(this);
	};

	handleLogin(userName, userID, userPic, userEmail) { //need to add local login with passwork and check with server
		this.setState({login: true, userName: userName, userID: userID, userPic: userPic, userEmail: userEmail })
	};
	handleLogout() {
		this.setState({login: false, userName: ""})
	};
	startLoading() {
		this.setState({loading: true})
	};
	stopLoading() {
		this.setState({loading: false})
	};
	enterPetientDetails( patientId) {
		this.setState({patientId: patientId})
	}
	setTitle(title) {
		this.setState({appTitle: title})
	}

	render() {
		const loginData ={  login: this.state.login,
							loading: this.state.loading,
							handleLogin: this.handleLogin,
							stopLoading: this.stopLoading,
							startLoading: this.startLoading,
							setTitle: this.setTitle,
						};
		const appData = {	login: this.state.login,
							userID: this.state.userID,
							patientData:this.state.patientData,
							setTitle: this.setTitle,
						};
		return (
			<div dir="rtl" className="App">
				<Navbar title={this.state.appTitle} login={this.state.login} useName={this.state.userName} userPic={this.state.userPic} handleLogout={this.handleLogout} />
				<Switch>
					<Route exact path='/' render={(props) => <Login  loginData={loginData} {...props} /> }/>
					<Route path='/login' render={(props) => <Login loginData={loginData} {...props} /> }/>
					<Route path='/settings' render={(props) => <Settings data={appData} {...props} /> }/>
					<Route path='/patients-list' render={(props) => <PatientsList  data={appData} {...props} /> }/>
					<Route path='/create-patient' render={(props) => <CreatePatient  data={appData} {...props} /> }/>
					<Route path='/patient/:patientId' render={(props) => <Patient  data={appData} {...props} /> }/>
					<Route render={(props) => <Error  {...props} /> }/>
				</Switch>
			</div>
		);
	}
}

export default App;
