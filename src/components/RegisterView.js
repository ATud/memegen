import React, {Component} from 'react';
import {Container, Header, Content, Form, Item, Input, Icon} from 'native-base';

class RegisterView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            invalidEmail: null,
            invalidUser: null,
            invalidPassword: null,
            password: '',
            description: 'Descriere',
            avatarUrl: '',
            age: null,
            lastThrottleCheck: +new Date,


        };
    }

    renderEmail() {
        if (this.state.invalidEmail===true) {
            return (
                <Icon name='close-circle' style={{color: 'red'}}/>
            );
        }   if (this.state.invalidEmail===false) {
            return (
                <Icon name='checkmark-circle' style={{color: 'green'}}/>
            );
        }
    }
    renderPassword() {

        if (this.state.invalidPassword===true) {
            return (
                <Icon name='close-circle' style={{color: 'red'}}/>
            );
        }   if (this.state.invalidPassword===false) {
            return (
                <Icon name='checkmark-circle' style={{color: 'green'}}/>
            );
        }
    }
    renderUserName() {
        if (this.state.invalidUser===true) {
            return (
                <Icon name='close-circle' style={{color: 'red'}}/>
            );
        }if (this.state.invalidUser===false) {
            return (
                <Icon name='checkmark-circle' style={{color: 'green'}}/>
            );
        }
    }
    async onRegisterPressed() {
        try {
            let response = await fetch('http://10.0.3.2:9000/api/users/create', {
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
            });
            let res = await response.text();
            if (response.status >= 200 && response.status < 300) {
                //Handle success
                console.log("success" + response)

                //On success we will store the access_token in the AsyncStorage

            } else {
                //Handle error
                let customError = res;
                Alert.alert('Username or email not available', customError,
                    [{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},])

            }
        } catch (error) {
            this.setState({error: error});
            console.log("error " + error);
        }
    }
   getUserByEmail =  () =>{

           fetch(global.hostAddress + '/getUserByEmail',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email
                })
            }).then((response) => response.json())
               .then((responseJson) => {
                   console.log(responseJson);
                   if (responseJson>0){
                       console.log("error");
                       this.setState({invalidEmail:true});
                       this.setState({email:''});
                   }else{
                       this.setState({invalidEmail:false});
                   }
               })
               .catch((error) => {
                   console.error(error);
               });

    };
   getUserByUserName =  (text) =>{

           fetch(global.hostAddress + '/getUserByUserName',{
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
                   if (responseJson>0){
                       console.log("error");
                       this.setState({invalidUser:true});
                       this.setState({email:''});
                   }else{
                       this.setState({invalidUser:false});
                       this.setState({user:false});
                   }
               })
               .catch((error) => {
                   console.error(error);
               });



    };
    validateEmail =  (text) => {
        console.log(text);

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === true) {
            this.setState({email: text});
          this.getUserByEmail();
        }
        else {
            console.log("Email is Not Correct");
            this.setState({invalidEmail: true});
            return false;

        }
    };

    throttle(fn, text, threshhold, scope) {
        threshhold || (threshhold = 250);

        let  deferTimer;
        let context = scope || this;

        let now = +new Date,
            args = arguments;
        if ( now - this.state.lastThrottleCheck >  threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(() => {
                this.setState({lastThrottleCheck: now});
                fn(text);
            }, threshhold);
        } else {
            context.setState({lastThrottleCheck: now});
        }
    };
    validateUserName = (text) =>{
        if(text.length>4){
            this.getUserByUserName(text)
        }else{
            this.setState({invalidUser:true})
        }

    };
    validatePassword = (text) =>{
        if(text.length>6){
            this.setState({invalidPassword:false})
        }else{
            this.setState({invalidPassword:true})
        }

    };
    render() {
        return (
            <Container>
                <Header/>
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
                            <Icon active name='eye'/>
                            <Input placeholder="Password"
                                   style={{height: 40, padding: 5, margin: 10}}
                                   secureTextEntry={true}
                                   onChangeText={(text) => this.throttle(this.validatePassword, text, 300 , this)}
                            />
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
                </Content>
            </Container>
        );
    }
}

module.exports = RegisterView;