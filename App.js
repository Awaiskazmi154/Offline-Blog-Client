
// importing the required modules from react, react native and redux library
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
} from 'react-native';

// importing the required modules from react-navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// importing the required modules from ./src/
import BlogForm from './src/BlogForm';
import BlogList from './src/blogList';
import BlogFormEdit from './src/BlogFormEdit';
import {store,persistor} from './src/store';
import { deleteBlog } from './src/actions/blog';

// importing the required modules from expo
import { BlurView } from 'expo-blur';
import * as MailComposer from 'expo-mail-composer';

// desable warning messages
console.disableYellowBox = true;

// getting the device width and height
var { height, width } = Dimensions.get('window');

// creating a STACK Navigator 
const Stack = createStackNavigator();



// AppStack Component
const AppStack = () => {

  // returning JSX
  return (

    // Provider component for redux store
    <Provider store={store}>
      
      {/* PersistGate for persistent storage */}
     <PersistGate loading={null} persistor={persistor}>

      {/* NavigationContainer */}
      <NavigationContainer>
        
        {/* StackNavigator for Screens */}
        <Stack.Navigator>
          
          {/* Splash_Screen */}
          <Stack.Screen
            name="Splash_Screen"
            component={Splash_Screen}
            options={{ headerShown: false }}
          />

          {/* Menu_Screen */}
          <Stack.Screen
            name="Menu_Screen"
            component={Menu_Screen}
            options={{ headerShown: false }}
          />

          {/* Home_Screen */}
          <Stack.Screen
            name="Home_Screen"
            component={Home_Screen}
            options={{ headerShown: false }}
          />

          {/* Blog_Screen */}
          <Stack.Screen
            name="Blog_Screen"
            component={Blog_Screen}
            
            // setting header options
            options={({ navigation }) => ({
              
              // header title
              headerTitle: () => (
                
                // header logo
                <Image
                  style={styles.headerLogo}
                  source={require('./images/headerlogo.png')}
                  resizeMode="contain"
                />
              ),

              // header title style
              headerTitleStyle: { flex: 1, textAlign: 'center' },
              headerStyle: { backgroundColor: 'lightgrey' },
              headerTitleAlign: 'center',
              
              // left header
              headerLeft: () => (
                
                // back icon
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    style={styles.headerBackIcon}
                    source={require('./images/backicon.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),

              // right header
              headerRight: () => (
               
                // menu icon
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Menu_Screen');
                  }}>
                  <Image
                    style={styles.headerMenuIcon}
                    source={require('./images/menuicon.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            })}
          />

          {/* BlogForm */}
          <Stack.Screen
            name="BlogForm"
            component={BlogForm}
            
            // setting header options
            options={({ navigation }) => ({
              
              // header title
              headerTitle: () => (
                
                // header logo
                <Image
                  style={styles.headerLogo}
                  source={require('./images/headerlogo.png')}
                  resizeMode="contain"
                />
              ),
              
              // header title style
              headerTitleStyle: { flex: 1, textAlign: 'center' },
              headerStyle: { backgroundColor: 'lightgrey' },
              headerTitleAlign: 'center',
              
              // left header
              headerLeft: () => (
                
                // back icon
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    style={styles.headerBackIcon}
                    source={require('./images/backicon.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),

              // right header
              headerRight: () => (
                
                // menu icon
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Menu_Screen');
                  }}>
                  <Image
                    style={styles.headerMenuIcon}
                    source={require('./images/menuicon.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            })}
          />

          {/* BlogFormEdit */}
          <Stack.Screen
            name="BlogFormEdit"
            component={BlogFormEdit}
            
            // setting header options
            options={({ navigation }) => ({
              
              // header title
              headerTitle: () => (
                
                // header logo
                <Image
                  style={styles.headerLogo}
                  source={require('./images/headerlogo.png')}
                  resizeMode="contain"
                />
              ),
              
              // header title style
              headerTitleStyle: { flex: 1, textAlign: 'center' },
              headerStyle: { backgroundColor: 'lightgrey' },
              headerTitleAlign: 'center',
              
              // left header
              headerLeft: () => (
                
                // back icon
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    style={styles.headerBackIcon}
                    source={require('./images/backicon.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),

               // right header
              headerRight: () => (
                
                // menu icon
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Menu_Screen');
                  }}>
                  <Image
                    style={styles.headerMenuIcon}
                    source={require('./images/menuicon.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            })}
          />

          {/* BlogFormEdit */}
          <Stack.Screen
            name="BlogList"
            component={BlogList}
            
             // setting header options
            options={({ navigation }) => ({
              
              // header title
              headerTitle: () => (
                
                // header logo
                <Image
                  style={styles.headerLogo}
                  source={require('./images/headerlogo.png')}
                  resizeMode="contain"
                />
              ),
              
              // header title style
              headerTitleStyle: { flex: 1, textAlign: 'center' },
              headerStyle: { backgroundColor: 'lightgrey' },
              headerTitleAlign: 'center',
              
              // left header
              headerLeft: (props) => (
                
                // back icon
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    style={styles.headerBackIcon}
                    source={require('./images/backicon.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),

              // right header
              headerRight: () => (
                
                // menu icon
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Menu_Screen');
                  }}>
                  <Image
                    style={styles.headerMenuIcon}
                    source={require('./images/menuicon.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
    </Provider>
  );
};


// Menu_Screen Component
const Menu_Screen = ({ navigation }) => {

  // react hook for modal visibility
  const [modalVisible, setModalVisible] = useState(true);
  
  // if modal is visible
  if (modalVisible == true) {
    
    // returning JSX
    return (

      // Modal component for the menu
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <ScrollView>
          <View style={styles.modalView}>
            <View style={styles.menuBox}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  navigation.navigate('Home_Screen'),
                    setModalVisible(!modalVisible);
                }}>
                <Text> Home </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  navigation.navigate('BlogList'),
                    setModalVisible(!modalVisible);
                }}>
                <Text> My Posts </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  navigation.navigate('BlogForm'),
                    setModalVisible(!modalVisible);
                }}>
                <Text> Post a Blog </Text>
              </TouchableOpacity>

              <Text>{'\n'}</Text>
            </View>
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => {
                setModalVisible(!modalVisible), navigation.goBack();
              }}>
              <Text style={styles.textStyle}>X</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    );
  } else {
    return null;
  }
};

// Splash_Screen Component
const Splash_Screen = (props) => {
  
  // timeout function for the splash to Home_Screen of 5secs
  setTimeout(() => {
    props.navigation.navigate('Home_Screen');
  }, 5000);

  // returning JSX
  return (
    <View style={styles.SplashScreenContainer}>
      <SafeAreaView style={styles.splashScreenSafeArea}>
        <ImageBackground
          style={styles.splashScreenBackground}
          source={require('./images/splash.png')}
          resizeMode="contain">
          <View style={styles.splashScreenIndicator}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};


// Home_Screen Component
const Home_Screen = (props) => {
  
   // returning JSX
  return (
    
    // Main View Container of Home Screen
    <View style={styles.homeScreenContainer}>
      <SafeAreaView>
        
        {/* homeScreenBackground */}
        <ImageBackground
          style={styles.homeScreenBackground}
          source={require('./images/back.png')}>
          
          {/* homeScreenLogoBox */}
          <View style={styles.homeScreenLogoBox}>
            <Image
              style={styles.homeScreenLogo1}
              source={require('./images/homelogo.png')}
              resizeMode="contain"
            />
            <Image
              style={styles.homeScreenLogo2}
              source={require('./images/homelogo2.png')}
              resizeMode="contain"
            />
          </View>
          
           {/* homeScreenBlurView */}
          <BlurView intensity={150} style={styles.homeScreenBlurView}>
            
            {/* viewposts btn */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('BlogList');
              }}>
              <Image
                style={styles.viewPostBtn}
                source={require('./images/viewbtnhome.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Image
              style={styles.separatorLine}
              source={require('./images/dashhome.png')}
              resizeMode="contain"
            />
            
            {/* postblog btn */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('BlogForm');
              }}>
              <Image
                style={styles.postBlogBtn}
                source={require('./images/postbtnhome.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </BlurView>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};


// Blog_Screen Component
const Blog_Screen = ({ navigation, route }) => {
  
  // react hook to check attachments view is set or not
  const [seeAttachments, setSeeAttachments] = useState(false);

  // dispatch function for blogreducer
  const dispatch = useDispatch();
  
  // deleting the blog using dispatch function
  const deleteCurrentBlog = (key) => {
    dispatch(deleteBlog(key));
    navigation.navigate('BlogList');
  };

  // onShare method to share the blog via E-mail
  const onShare = async () => {
    
    // try block
    try {

      // configuring sharing options
      route.params.attachments.push(route.params.image);
      const mailShareOptions = {
        attachments: route.params.attachments,
        body: route.params.content,
        subject: route.params.title,
      };

      // setting MailComposer 
      MailComposer.composeAsync(mailShareOptions).catch((e) => {
        console.log(e);
        Alert.alert('Error', 'Please configure your device mail box.');
      });
    } 
    
    // catch block
    catch (error) {
      alert(error.message);
    }
  };

   // returning JSX
  return (

    // Main View Container of blogScreen
    <View style={styles.blogScreenContainer}>
      <SafeAreaView>
        
        {/* ScrollView for Blog Content*/}
        <ScrollView style={styles.blogScreenScrollView}>
          
          {/* blogScreenContentContainer*/}
          <View style={styles.blogScreenContentContainer}>
            
            {/* blogScreenIconsBox */}
            <View style={styles.blogScreenIconsBox}>
            
            {/* blogScreenLeftSideIcons */}
              <View style={styles.blogScreenLeftSideIcons}>
            
                {/* shareicon */}
                <TouchableOpacity onPress={onShare}>
                  <Image
                    style={styles.shareIcon}
                    source={require('./images/shareicon.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* checking wheher the attachments view is not set*/}
                {seeAttachments == false ? (
                  
                  // attachicon
                  <TouchableOpacity onPress={() => setSeeAttachments(true)}>
                    <Image
                      style={styles.attachIcon}
                      source={require('./images/attachicon.png')}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ) : (

                  // checking wheher the attachments view is set
                  // attachiconblack
                  <TouchableOpacity onPress={() => setSeeAttachments(false)}>
                    <Image
                      style={styles.attachIconBlack}
                      source={require('./images/attachiconblack.png')}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                )}

                {/* editiconblue */}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('BlogFormEdit', route.params);
                  }}>
                  <Image
                    style={styles.editIcon}
                    source={require('./images/editiconblue.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              
              {/* deleteiconblue */}
              <TouchableOpacity
                onPress={() => deleteCurrentBlog(route.params.key)}>
                <Image
                  style={styles.deleteIcon}
                  source={require('./images/deleteiconblue.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {seeAttachments == false ? (
              <View style={styles.blogScreenContentBox}>
                <Text style={styles.blogTitle}>{route.params.title}</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    style={styles.blogImage}
                    source={{ uri: route.params.image }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text style={styles.blogContent}>{route.params.content}</Text>
              </View>
            ) : route.params.attachments.length != 0 ? (
              route.params.attachments.map((item, key) => (
                <View style={styles.blogAttachmentsBox}>
                  <TouchableOpacity style={{}} onPress={() => {}}>
                    <Image
                      style={styles.blogAttachmentImage}
                      source={{ uri: item }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.blogNoAttachmentsBox}>
                <Text style={styles.blogNoAttachmentsText}>No Attachments</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

// Style Sheet
const styles = StyleSheet.create({
  headerLogo: { width: 200, height: 50 },
  headerBackIcon: { width: 30, height: 30, marginLeft: 10 },
  headerMenuIcon: { width: 30, height: 30, marginRight: 10 },

  SplashScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  splashScreenSafeArea: { paddingTop: 15 },
  splashScreenBackground: {
    width: width,
    height: height,
    flex: 1,
    resizeMode: 'cover',
  },
  splashScreenIndicator: {
    paddingTop: height * 0.2,
    backgroundColor: 'transparent',
  },

  homeScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeScreenBackground: {
    width: width,
    height: height,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  homeScreenLogoBox: {
    flexDirection: 'row',
    width: width * 0.9,
    paddingTop: height * 0.1,
  },
  homeScreenLogo1: {
    height: height * 0.15,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  homeScreenLogo2: {
    height: height * 0.1,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  homeScreenBlurView: {
    height: height * 0.4,
    marginBottom: height * 0.07,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 40,
  },
  viewPostBtn: { height: height * 0.1 },
  separatorLine: { height: height * 0.1, marginBottom: -10 },
  postBlogBtn: { height: height * 0.1, marginBottom: 10 },

  blogScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  blogScreenScrollView: { flex: 1 },
  blogScreenContentContainer: {
    borderRadius: 15,
    marginTop: 10,
    backgroundColor: 'white',
    width: width * 0.9,
  },

  blogScreenIconsBox: {
    flexDirection: 'row',
    width: width * 0.9,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  blogScreenLeftSideIcons: {
    flexDirection: 'row',
    width: width * 0.6,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  shareIcon: { height: height * 0.05, width: width * 0.1 },

  attachIcon: { height: height * 0.1, width: width * 0.1 },
  attachIconBlack: { height: height * 0.1, width: width * 0.1 },
  editIcon: { height: height * 0.1, width: width * 0.1 },
  deleteIcon: { height: height * 0.05, width: width * 0.1 },

  blogScreenContentBox: {
    width: width * 0.9,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  blogTitle: { fontSize: 25, padding: width * 0.03, marginBottom: 5 },

  blogImage: {
    height: height * 0.4,
    width: width * 0.9,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -30,
  },

  blogContent: { fontSize: 17, padding: width * 0.03, marginTop: -20 },

  blogAttachmentsBox: {
    width: width * 0.9,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blogAttachmentImage: {
    height: height * 0.4,
    width: width * 0.9,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -30,
  },
  blogNoAttachmentsBox: {
    width: width * 0.9,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blogNoAttachmentsText: {
    fontSize: 25,
    padding: width * 0.03,
    marginBottom: 5,
  },

  modalView: {
    textAlign: 'center',
    margin: 25,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    paddingBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  openButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 60,
    elevation: 2,
    margin: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuBox: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },

  menuItem: {
    marginTop: 10,
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});


// export AppStack Component
export default AppStack;