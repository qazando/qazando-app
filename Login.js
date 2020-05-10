import React, { Component }from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, StatusBar, Keyboard, SafeAreaView } from 'react-native';
import AuthInput from './components/AuthInput'
import logo from './assets/logo-logo.png'
import logoName from './assets/logo-name.png'

export default class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    keyboardOpen: false,
    loginFail: false
  }

  login = () => {
   if(this.state.email=='teste@teste.com' && this.state.password==123456){
     this.props.navigation.navigate('Home')
     this.setState({ email: null, password: null })
   } else {
      this.setState({ loginFail: true, keyboardOpen: false })
   }
   Keyboard.dismiss()
  }

  loginUp = () => {
    this.setState({ keyboardOpen: true })
  }

  loginDown = () => {
    this.setState({ keyboardOpen: false })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={{ marginTop: this.state.keyboardOpen?'2%':'40%' }}>
          <Image source={logo} style={{width: 150, height: 150}}></Image>
          <Image source={logoName} style={{width: 150, height: 50}}></Image>
        </View>

        <View style={[styles.formContainer]}>
          <AuthInput icon='at' autoCapitalize = 'none' placeholder='E-mail' style={styles.input} 
                      value={this.state.email}
                      onChangeText={email => this.setState({ email })} 
                      onFocus={() => this.loginUp()}
                      onBlur={() => this.loginDown()}
                      accessible={true} accessibilityLabel="email"
                      />
          <AuthInput icon='lock' secureTextEntry={true} placeholder='Senha' style={styles.input} 
                      value={this.state.password}
                      onChangeText={password => this.setState({ password })} 
                      onFocus={() => this.loginUp()}
                      onBlur={() => this.loginDown()}
                      accessible={true} accessibilityLabel="senha"
                      />
          <TouchableOpacity onPress={() => this.login()} >
              <View style={[styles.button, {backgroundColor: '#3aa7aa' }]} accessible={true} accessibilityLabel="entrar">
                  <Text style={styles.buttonText}>Entrar</Text>
              </View>
          </TouchableOpacity>

          {this.state.loginFail && 
            <View style={{alignItems: 'center'}}>
              <Text accessible={true} accessibilityLabel="lognFail"
              style={{color: 'red', fontSize: 20, margin: 10}}>Erro no login!</Text>
            </View>
          }
        </View>
        
       

      </SafeAreaView>    
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    width: '90%',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    height: 45
},
  buttonText: {
    color: '#FFF',
    fontSize: 20,
  }

});
