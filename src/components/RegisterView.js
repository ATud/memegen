import React, {Component} from 'react';
import {View, Text,Alert} from 'react-native';
import {Container, Header, Content, Form, Item, Input, Icon,Button} from 'native-base';

class RegisterView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            invalidEmail: null,
            invalidUser: null,
            invalidPassword: null,
            invalidConfirmPassword: null,
            password: '',
            retypePassword: '',
            firstPassword: '',
            description: 'Descriere',
            avatarUrl: '',
            age: null,
            securePassword: true,
            secureConfirmPassword: true,
            lastThrottleCheck: +new Date,
            error: false


        };
    }

    validateUserName = (text) => {
        if (text.length > 4) {
            this.getUserByUserName(text)
        }
        if (text === '') {
            this.setState({invalidUser: null})
        }
        else {
            this.setState({invalidUser: true})
        }
    };
    validatePassword = (text) => {
        let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (reg.test(text)) {
            this.setState({firstPassword: text});
            this.setState({invalidPassword: false})
        } else if (text === '') {
            this.setState({invalidPassword: null})
        } else {
            this.setState({invalidPassword: true})
        }

    };
    confirmPassword = (text) => {
        if (text === '') {
            this.setState({invalidConfirmPassword: null})
        }
        else if (text === this.state.firstPassword) {
            this.setState({password: text});
            this.setState({invalidConfirmPassword: false});
        } else {
            this.setState({invalidConfirmPassword: true});
        }

    };

    renderEmail() {
        if (this.state.invalidEmail === true) {
            return (
                <Icon name='close-circle' style={{color: 'red'}}/>
            );
        }
        if (this.state.invalidEmail === false) {
            return (
                <Icon name='checkmark-circle' style={{color: 'green'}}/>
            );
        }
    }

    renderPassword() {

        if (this.state.invalidPassword === true) {
            return (
                <View style={{flexWrap: 'wrap',  flexDirection:'row',  alignItems: 'flex-end'}}>
                    <Icon name='eye' onPress={()=>this.showPassword(this.state.securePassword, 'password')}/>
                    <Icon name='close-circle' style={{color: 'red'}}/>
                </View>
            );
        }
        if (this.state.invalidPassword === false) {
            return (
                <View style={{flexWrap: 'wrap',  flexDirection:'row',  alignItems: 'flex-end'}}>
                    <Icon name='eye' onPress={()=>this.showPassword(this.state.securePassword, 'password')}/>
                    <Icon name='checkmark-circle' style={{color: 'green'}}/>
                </View>
            );
        }
    }

    renderConfirmPassword() {

        if (this.state.invalidConfirmPassword === true) {
            return (

                <View style={{flexWrap: 'wrap',  flexDirection:'row',  alignItems: 'flex-end'}}>
                    <Icon name='eye' onPress={()=>this.showPassword(this.state.secureConfirmPassword, 'confPass')}/>
                    <Icon name='close-circle' style={{color: 'red'}}/>
                </View>
            );
        }
        if (this.state.invalidConfirmPassword === false) {
            return (
                <View style={{flexWrap: 'wrap',  flexDirection:'row',  alignItems: 'flex-end'}}>
                    <Icon name='eye' onPress={()=>this.showPassword(this.state.secureConfirmPassword, 'confPass')}/>
                    <Icon name='checkmark-circle' style={{color: 'green'}}/>
                </View>

            );
        }
    }

    renderUserName() {
        if (this.state.invalidUser === true) {
            return (
                <Icon name='close-circle' style={{color: 'red',borderBottomColor:'red'}}/>
            );
        }
        if (this.state.invalidUser === false) {
            return (
                <Icon name='checkmark-circle' style={{color: 'green'}}/>
            );
        }
    }

    registerUser = () => {
        fetch(global.hostAddress + '/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                age: this.state.age,
                description: this.state.description,
                avatarUrl: this.state.avatarUrl,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(
                    'Success',
                    'Success',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                );
            })
            .catch((error) => {
                console.error(error);
            });


    };

    getUserByEmail = (text) => {
        fetch(global.hostAddress + '/getUserByEmail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: text
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson > 0) {
                    console.log("error");
                    this.setState({invalidEmail: true});
                    this.setState({email: ''});
                } else {
                    this.setState({email:text});
                    this.setState({invalidEmail: false});
                }
            })
            .catch((error) => {
                console.error(error);
            });

    };
    getUserByUserName = (text) => {
        fetch(global.hostAddress + '/getUserByUserName', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: text
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson > 0) {
                    console.log("error");
                    this.setState({invalidUser: true});
                    this.setState({username: ''});
                } else {
                    this.setState({username:text});
                    this.setState({invalidUser: false});
                    this.setState({user: false});
                }
            })
            .catch((error) => {
                console.error(error);
            });


    };
    validateEmail = (text) => {
        console.log(text);

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === true) {
            this.getUserByEmail(text);
        } else if (text === '') {
            this.setState({invalidEmail: null});
        }
        else {
            console.log("Email is Not Correct");
            this.setState({invalidEmail: true});
            return false;

        }
    };

    throttle(fn, text, threshhold, scope) {
        threshhold || (threshhold = 250);
        let deferTimer;
        let context = scope || this;
        let now = +new Date;
        if (now - this.state.lastThrottleCheck > threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(() => {
                this.setState({lastThrottleCheck: now});
                fn(text);
            }, threshhold);
        } else {
            context.setState({lastThrottleCheck: now});
        }
    }

;


    showPassword = (state, from) => {
        debugger;
        if (from === 'password') {
            if (state) {
                this.setState({securePassword: false});
            } else {
                this.setState({securePassword: true});
            }
        } else {
            if (state) {
                this.setState({secureConfirmPassword: false});
            } else {
                this.setState({secureConfirmPassword: true});
            }
        }
    };
    validateAndSubmit = ()=> {
        debugger;
        this.setState({error: false});
        if (this.state.invalidUser === null || this.state.invalidUser) {
            this.setState({error: true});
        }
        if (this.state.invalidEmail === null || this.state.invalidEmail) {
            this.setState({error: true});
        }
        if (this.state.password === '') {
            this.setState({error: true});
        }
        if (!this.state.error) {
            this.registerUser();
        } else {

        }
    };

    render() {
        return (
            <Container>
                <Header style={{alignItems:'center'}}>
                    <Text style={{fontSize:22,color:'white'}}>Register</Text>
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Icon active name='person'/>
                            <Input placeholder='Username'
                                   onChangeText={(text) =>  this.throttle(this.validateUserName, text, 300 , this)}
                                   style={{height: 40, padding: 5, margin: 10}}/>
                            {this.renderUserName()}
                        </Item>
                        <Item>
                            <Icon active name='mail'/>
                            <Input
                                style={{height: 40, padding: 5, margin: 10}}
                                onChangeText={(text) => this.throttle(this.validateEmail, text, 300 , this)}
                                placeholder="Email"
                                secureTextEntry={true}
                                keyboardType="email-address"
                                />
                            {this.renderEmail()}


                        </Item>
                        <Item >
                            <Icon active name='lock'/>
                            <Input placeholder="Password"
                                   style={{height: 40, padding: 5, margin: 10}}
                                   secureTextEntry={this.state.securePassword}
                                   onChangeText={(text) => this.throttle(this.validatePassword, text, 300 , this)}
                                />

                            {this.renderPassword()}
                        </Item>
                        <Item >
                            <Icon active name='lock'/>
                            <Input placeholder="Confirm Password"
                                   style={{height: 40, padding: 5, margin: 10}}
                                   secureTextEntry={this.state.secureConfirmPassword}
                                   onChangeText={(text) => this.throttle(this.confirmPassword, text, 300 , this)}
                                />

                            {this.renderConfirmPassword()}
                        </Item>
                        <Item >
                            <Icon active name='pulse'/>
                            <Input placeholder="Age"
                                   style={{height: 40, padding: 5, margin: 10}}
                                   onChangeText={(text) => this.setState({age:text})}
                                />
                        </Item>
                        <Item >
                            <Icon active name='camera'/>
                            <Input placeholder="Avatar"
                                   style={{height: 40, padding: 5, margin: 10}}
                                   onChangeText={(text) => this.setState({avatarUrl:text})}
                                />
                        </Item>
                        <Item last>
                            <Icon active name='bookmarks'/>
                            <Input placeholder="Description"
                                   style={{padding: 5, margin: 10}}
                                   multiline={true}
                                   numberOfLines={4}
                                   onChangeText={(description) => this.setState({description})}
                                />
                        </Item>
                    </Form>
                    <Button full onPress={()=>this.validateAndSubmit()}>
                        <Text style={{color:'#ffffff'}}>Register</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

module.exports = RegisterView;