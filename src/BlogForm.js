
// importing the required modules from react, react native and redux library
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useDispatch } from 'react-redux';

// importing the required modules from expo
import * as ImagePicker from 'expo-image-picker';

// importing the { addBlog } from ./actions/blog
import { addBlog } from './actions/blog';

// desable warning messages
console.disableYellowBox = true;

// getting the device width and height
var { height, width } = Dimensions.get('window');

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year

// BlogForm Component
const BlogForm = ({ navigation }) => {
  
  // react hook to get the current date
  const [currentDate, setCurrentDate] = useState(
    date + '/' + month + '/' + year
  );

  // react hook for attachmnet images of the blog item
  const [images, setImages] = useState([]);

  // react hook for the blog image
  const [image, setImage] = useState(null);

  // react hook for the blog item
  const [blog, setBlog] = useState({
    title: '',
    image: null,
    content: '',
    attachments: [],
    date: currentDate,
  });

  // dispatch function for blogreducer
  const dispatch = useDispatch();
  
  // adding the blog using dispatch function
  const submitBlog = (blog) => dispatch(addBlog(blog));

  // useEffect for image picker module
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // pickImage method for getting image for blog 
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // if the image is recieved set the blog item image
    if (!result.cancelled) {
      setImage(result.uri);
      setBlog({
        title: blog.title,
        image: result.uri,
        content: blog.content,
        attachments: blog.attachments,
        date: currentDate,
      });
    }
  };

  // attachimage method to attach an image for the blog item from the camera roll
  const attachImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // if the image is recieved set the blog item attachments
    if (!result.cancelled) {
      setImages([...images, result.uri]);
      setBlog({
        title: blog.title,
        image: blog.image,
        content: blog.content,
        attachments: [...blog.attachments, result.uri],
        date: currentDate,
      });
    }
  };

   // returning JSX
  return (

    // Main View component
    <View style={styles.container}>
      
      {/* SafeAreaView (useful for iPhones) */}
      <SafeAreaView>
        
        {/* ScrollView for Blog Form */}  
        <ScrollView style={styles.scrollView}>
          
          {/* View for blueBar*/} 
          <View style={styles.blueBar}>
            <Image
              style={styles.blueBarImage}
              source={require('../images/bluebar.png')}
              resizeMode="contain"
            />
          </View>
          
          {/* View for BlogForm*/} 
          <View style={styles.blogFormBox}>
            
            {/* blogTitle */}
            <TextInput
              value={blog.title}
              style={styles.blogTitle}
              onChangeText={(title) =>
                setBlog({
                  title: title,
                  image: blog.image,
                  content: blog.content,
                  attachments: blog.attachments,
                  date: currentDate,
                })
              }
              placeholder={'Title'}
            />

            {/* blogImageBox */}
            <View style={styles.blogImageBox}>
              
              {/* if image is picked from camera roll */}
              {image ? (
                
                // view the blog image
                <Image
                  source={{ uri: image }}
                  style={styles.blogImage}
                  resizeMode="contain"
                />
              ) : (

                // if image is not picked from camera roll
                // show the 'Image' text
                <Text style={styles.blogImageText}>Image</Text>
              )}

              {/* imageicon */}
              <TouchableOpacity onPress={pickImage}>
                <Image
                  style={styles.blogImageIcon}
                  source={require('../images/imageicon.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* blogAttachmentsBox */}
            <View style={styles.blogAttachmentsBox}>
              
              {/* Horizontal ScrollView for attachments */}
              <ScrollView horizontal={true}>
                {images.length != 0 ? (
                  images.map((item, key) => (
                    <Image
                      key={key}
                      source={{ uri: item }}
                      style={styles.blogAttachmentImage}
                      resizeMode="contain"
                    />
                  ))
                ) : (
                  <Text style={styles.blogAttachmentText}>Attachments</Text>
                )}
              </ScrollView>

              {/* blog Attachment Icon */}
              <TouchableOpacity onPress={attachImage}>
                <Image
                  style={styles.blogAttachmentIcon}
                  source={require('../images/attachicon.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* blog Content */}    
            <TextInput
              value={blog.content}
              multiline={true}
              numberOfLines={4}
              style={styles.blogContent}
              onChangeText={(content) =>
                setBlog({
                  title: blog.title,
                  image: blog.image,
                  content: content,
                  attachments: blog.attachments,
                  date: currentDate,
                })
              }
              placeholder={'Blog Content'}
            />

              {/* post blog button */}  
            <TouchableOpacity
              onPress={() => {
                submitBlog(blog);
                setImage(null);
                setImages([]);
                setBlog({
                  title: '',
                  image: null,
                  content: '',
                  attachments: [],
                  date: '',
                });
                navigation.navigate('BlogList');
              }}>
              <Image
                style={styles.postBlogIcon}
                source={require('../images/postblogbtn.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

// Style Sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollView: { flex: 1 },
  blueBar: { marginBottom: -30 },

  blueBarImage: { height: height * 0.2, width: width * 0.9 },

  blogFormBox: {
    borderRadius: 15,
    marginTop: -30,
    backgroundColor: 'white',
    width: width * 0.9,
  },
  blogTitle: {
    fontSize: 30,
    paddingLeft: 20,
    paddingBottom: 10,
    marginTop: 25,
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  blogImageBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },

  blogImage: { width: 200, height: 200 },

  blogImageText: { fontSize: 30 },

  blogImageIcon: { height: height * 0.15, width: width * 0.15 },
  blogAttachmentsBox: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },

  blogAttachmentImage: { width: width * 0.5, height: 200 },
  blogAttachmentText: { fontSize: 30 },
  blogAttachmentIcon: {
    height: height * 0.15,
    width: width * 0.15,
    marginLeft: 5,
  },

  blogContent: {
    fontSize: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    marginTop: 25,
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  postBlogIcon: {
    height: height * 0.1,
    width: width * 0.7,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

// export BlogForm Component
export default BlogForm;
