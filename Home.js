import React, { Component }from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Keyboard, SafeAreaView, Image, TextInput} from 'react-native';
import { Input } from 'react-native-elements';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import logo from './assets/logo-logo.png'
import logoName from './assets/logo-name.png'
export default class HomeScreen extends Component {

  state={
    itens:[
      { chave: '12323', valor: 'Eduardo Finotti'},
      { chave: '98839', valor: 'Igor Resende'},
      { chave: '87673', valor: 'Caio Silva'},
      { chave: '55555', valor: 'Fernando José'},
      { chave: '11112', valor: 'Pedro Raniel'},
      { chave: '55552', valor: 'Lucas Dira'},
      { chave: '55542', valor: 'Lucas Dira'},
      { chave: '55522', valor: 'Lucas Dira'},
      { chave: '55512', valor: 'Lucas Dira'},
      { chave: '5952', valor: 'Lucas Dira'},
      { chave: '66525', valor: 'Clarise Falcão'},
    ],
    chave: null, 
    valor: null,
    haveCode: false,
    search: null,
    alunos: []
  }

  componentDidMount() {
    this.setState({ alunos: this.state.itens })
  }

  cancel = () => {
    Keyboard.dismiss()
    this.setState({ chave: null, valor: null })
  }

  save = () => {
    Keyboard.dismiss()
    if(this.state.chave==null || this.state.valor == null){
      Alert.alert('Os campos devem ser preenchidos!')
    } else {

      var item = [...this.state.itens]
      var exist = false;

      for (let index = 0; index < item.length; index++) {

        if(item[index].chave == this.state.chave){
          exist = true
          console.log('---')
          console.log(item[index].chave)
          console.log('---')
          this.setState({ haveCode: true })
          return
        } else{
          console.log('2')
          this.setState({ haveCode: false })
        }
      } 
      
      if(!exist){
          item.push({
            chave: this.state.chave, valor: this.state.valor
          })
          this.setState({ itens: item })
          this.setState({ chave: null, valor: null })
          
          showMessage({
            message: "Salvo",
            description: "Dados salvos!",
            type: "success",
            floating: true,
            position: "bottom",
            animationDuration: "400",
            duration: 5000
          });
      }
    }
  }

  SearchFilterFunction(text) {
    let array = [...this.state.itens]

    const newData = array.filter(function(item) {
      const itemData = item.valor.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });

    this.setState({
      alunos: newData,
      search: text,
    });
  }

  logout = () => {
    this.props.navigation.navigate('Login')
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        
        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', alignItems: 'center', 
                        marginHorizontal: '7%',
                        marginTop: 20,
                        marginBottom: 20,
                        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
            <Image source={logo} style={{width: 40, height: 40}}></Image>
            <Image source={logoName} style={{width: 100, height: 35}}></Image>
          </View>
          <TouchableOpacity  style={{ alignItems: 'flex-end'}}
            onPress={() => this.logout()} accessible={true} accessibilityLabel="logout">
            <Icon name="sign-out" size={30} color='#fff' />
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: '5%', flexDirection: 'row' }}>
            
            <View style={{ width: '30%'}}>
              <Input label='Código'
                inputStyle = {{ color: 'white'}}
                onChangeText={(chave) => this.setState({chave})}
                value={this.state.chave}
                accessible={true} accessibilityLabel="codigo"
              />
            </View>

            <View style={{width: '70%'}}>
              <Input label='Aluno' 
                inputStyle = {{ color: 'white'}}
                onChangeText={(valor) => this.setState({valor})}
                value={this.state.valor}
                accessible={true} accessibilityLabel="aluno"
              />
            </View>
          </View>

          <View style={styles.buttonsContent}>
            <TouchableOpacity style={{width: '48%'}} 
                              onPress={() => this.save()} 
                              accessible={true} accessibilityLabel="salvar">
              <View style={[styles.button, {backgroundColor: '#3aa7aa', marginRight: '5%' }]}>
                  <Text style={styles.buttonText}>Salvar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '48%'}} 
                              onPress={() => this.cancel()} 
                              accessible={true} accessibilityLabel="cancelar">
              <View style={[styles.button, {backgroundColor: '#C43A3A' }]}>
                  <Text style={styles.buttonText}>Cancelar</Text>
              </View>
            </TouchableOpacity>
          </View>
        
        {this.state.haveCode && 
            <View style={{marginLeft: 30}}>
              <Text accessible={true} accessibilityLabel="haveCode"
                style={{color: 'red', fontSize: 20, margin: 10}}>Já existe um aluno com este código!</Text>
            </View>
        }

        <View style={{ marginHorizontal: 20, marginTop:20, marginBottom: 250}}>

          <Input label='Search' 
            style={styles.textInputStyle}
            inputStyle = {{ color: 'white'}}
            onChangeText={text => this.SearchFilterFunction(text)}
            value={this.state.text}
            accessible={true} accessibilityLabel="search"
          />

          <FlatList data={this.state.alunos} 
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.chave}`}
            renderItem={({ item }) =>  
              <View style={styles.itemContainer} accessible={true} accessibilityLabel={item.chave}>
                <Text style={styles.itemText}>{item.chave} - {item.valor}</Text>
              </View>
            } 
          />
        </View>
        <FlashMessage position="top" />

      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  itemContainer: {
    borderRadius: 5,
    margin: 5,
    paddingHorizontal: 15,
    height: 65,
    backgroundColor: '#fff',
    alignContent: "center",
    justifyContent: 'center'
  },
  itemText: {
    alignContent: "center",
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 20
  },
  text: {
    fontSize: 30,
    color: 'white'
  },
  buttonsContent: {
     alignContent: 'center',
     justifyContent: 'center', 
     flexDirection: 'row', 
     marginHorizontal: '5%',
     marginTop: 7
  },
  button: {
    marginTop: 10,
    padding: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    // backgroundColor: '#FFFFFF',
  },
})
