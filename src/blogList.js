
// importing the required modules from react and react native library
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';

// import useDispach and useSelector from redux 
import { useDispatch, useSelector } from 'react-redux';

// import deleteBlog action
import { deleteBlog } from './actions/blog';

// desable warning messages
console.disableYellowBox = true;

// getting the device width and height
var { height, width } = Dimensions.get('window');

// BlogList Component
const BlogList = ({ navigation }) => {
  
  // react hook for selected blog items
  const [isSelected, setSelection] = useState([]);

  // react hoook for searched blog items
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  const [searchOn, setSearch] = useState(false);
  const [searchtext, setSearchtext] = useState('');

  // dispatch function for blogreducer
  const dispatch = useDispatch();
  
  // deleting the blog using dispatch function
  const deleteCurrent = (key) => dispatch(deleteBlog(key));

  // search method to search the blog containing search text
  const search = () => {
    if (searchtext.length != 0) {
      blogs.map((item) =>
        item.title.includes(searchtext) || item.content.includes(searchtext)
          ? setSearchedBlogs([...searchedBlogs, item])
          : null
      );
      setSearch(true);
    } else {
      return;
    }
  };

  // deleteSelected method for delecting selected (checked) blog items
  const deleteSelected = () => {
    if (isSelected.length != 0) {
      isSelected.map((key) => dispatch(deleteBlog(key)));
    } else {
      return;
    }
  };

  // using useSelector function to get the updated blogList from the redux store
  const blogs = useSelector((state) => state.blogReducer.blogList);

  // returning JSX
  return (
    
    // Main View component
    <View style={styles.container}>
      
       {/* SafeAreaView (useful for iPhones) */}
      <SafeAreaView>

        {/* ScrollView for Blog List Items */}  
        <ScrollView style={styles.scrollView}>
          
           {/* blogListContainer */}
          <View style={styles.blogListContainer}>

            {/* searchAndIconsBox */}
            <View style={styles.searchAndIconsBox}>

               {/* searchBox */}
              <View style={styles.searchBox}>
                
                {/* searchInput */}
                <TextInput
                  style={styles.searchInput}
                  onChangeText={(text) => setSearchtext(text)}
                  placeholder={'Search'}
                />

                {/* checking whether the search is not activated */}
                {searchOn == false ? (
                  
                  // searchIcon Touch Box
                  <TouchableOpacity
                    onPress={() => {
                      search();
                    }}>
                    
                    {/* searchIcon Image */}
                    <Image
                      style={styles.searchIcon}
                      source={require('../images/searchicon.png')}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ) : (
                  
                  // if the search is activated
                  // searchStopIcon Touch Box
                  <TouchableOpacity
                    onPress={() => {
                      setSearchedBlogs([]), setSearch(false);
                    }}>

                    {/* searchStopIcon Image */}
                    <Image
                      style={styles.searchStopIcon}
                      source={require('../images/searchstop.png')}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                )}
              </View>
              
              {/* delete icon black */}
              <TouchableOpacity onPress={deleteSelected}>
                <Image
                  style={styles.deleteIconBig}
                  source={require('../images/deleteiconblack.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* checking the blogs list is not empty */}
            {blogs.length != 0
              ? 
              
              // checking the search is not activated
              searchOn == false
                ? 
                
                // iterating through the blog items
                blogs.map((item, key) => (
                    
                    // Main View of list items
                    <View style={styles.blogItemsListBox}>
                      
                      {/* blogItemImage */}
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Blog_Screen', item);
                        }}>
                        <Image
                          style={styles.blogItemImage}
                          source={{ uri: item.image }}
                        />
                      </TouchableOpacity>
                      
                      {/* blogItemRightSection */}
                      <View style={styles.blogItemRightSection}>
                        
                         {/* checking the blog item is not checked for deletion */}
                        {isSelected.includes(item.key) ? (
                          
                           // checkedBox
                          <TouchableOpacity
                            style={styles.checkedBox}
                            onPress={() =>
                              setSelection(
                                isSelected.filter((k) => k !== item.key)
                              )
                            }>
                            <Image
                              style={styles.checkedBoxImage}
                              source={require('../images/checked.png')}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        ) : (

                          // checking the blog item is checked for deletion
                          // uncheckedBox
                          <TouchableOpacity
                            style={styles.uncheckedBox}
                            onPress={() => {
                              setSelection([...isSelected, item.key]);
                            }}>
                            <Image
                              style={styles.uncheckedBoxImage}
                              source={require('../images/unchecked.png')}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        )}

                        {/* blogTitle Touch */}
                        <TouchableOpacity
                          style={styles.blogTitle}
                          onPress={() => {
                            navigation.navigate('Blog_Screen', item);
                          }}>
                          
                          {/* blogTitle Text */}
                          <Text style={styles.blogTitleText} numberOfLines={2}>
                            {item.title.slice(0, 16) + '...'}
                          </Text>
                        </TouchableOpacity>
                        
                        {/* blogContent Touch */}
                        <TouchableOpacity
                          style={styles.blogContent}
                          onPress={() => {
                            navigation.navigate('Blog_Screen', item);
                          }}>
                          
                          {/* blogContent Text */}
                          <Text
                            multiline={true}
                            numberOfLines={2}
                            style={styles.blogContentText}>
                            {item.content.slice(0, 40) + '  ...'}
                          </Text>

                          {/* blogDateAndIcons */}
                        </TouchableOpacity>
                        <View style={styles.blogDateAndIcons}>
                          
                           {/* timeIcon */}
                          <Image
                            style={styles.timeIcon}
                            source={require('../images/timeicon.png')}
                            resizeMode="contain"
                          />
                          
                          {/* date */}
                          <Text style={styles.dateText}>{item.date}</Text>
                          
                          {/* BlogFormEdit Icon */}
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('BlogFormEdit', item);
                            }}>
                            <Image
                              style={styles.editIcon}
                              source={require('../images/editiconblack.png')}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                          
                           {/* deleteIconSmall */}
                          <TouchableOpacity
                            onPress={() => deleteCurrent(item.key)}>
                            <Image
                              style={styles.deleteIconSmall}
                              source={require('../images/deleteiconblack.png')}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))
                  
                  // checking if the search is activated
                  // iterating through the search match list items
                : searchedBlogs.map((item, key) => (
                    
                    // Main View of Searched list items
                    <View style={styles.blogItemsListBox}>
                      
                      {/* blogItemImage */}
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Blog_Screen', item);
                        }}>
                        <Image
                          style={styles.blogItemImage}
                          source={{ uri: item.image }}
                        />
                      </TouchableOpacity>
                      
                      {/* blogItemRightSection */}
                      <View style={styles.blogItemRightSection}>
                        
                         {/* checking the blog item is not checked for deletion */}
                        {isSelected.includes(item.key) ? (
                          
                          // checkedBox
                          <TouchableOpacity
                            style={styles.checkedBox}
                            onPress={() =>
                              setSelection(
                                isSelected.filter((k) => k !== item.key)
                              )
                            }>
                            <Image
                              style={styles.checkedBoxImage}
                              source={require('../images/checked.png')}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        ) : (

                          // checking the blog item is checked for deletion
                          // uncheckedBox
                          <TouchableOpacity
                            style={styles.uncheckedBox}
                            onPress={() => {
                              setSelection([...isSelected, item.key]);
                            }}>
                            <Image
                              style={styles.uncheckedBoxImage}
                              source={require('../images/unchecked.png')}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        )}

                        {/* blogTitle Touch */}
                        <TouchableOpacity
                          style={styles.blogTitle}
                          onPress={() => {
                            navigation.navigate('Blog_Screen', item);
                          }}>
                          
                           {/* blogTitle Text */}
                          <Text style={styles.blogTitleText} numberOfLines={2}>
                            {item.title.slice(0, 16) + '...'}
                          </Text>
                        </TouchableOpacity>
                        
                        {/* blogContent Touch */}
                        <TouchableOpacity
                          style={styles.blogContent}
                          onPress={() => {
                            navigation.navigate('Blog_Screen', item);
                          }}>
                          
                           {/* blogContent Text */}
                          <Text
                            multiline={true}
                            numberOfLines={2}
                            style={styles.blogContentText}>
                            {item.content.slice(0, 40) + '  ...'}
                          </Text>
                        </TouchableOpacity>
                        
                        {/* blogDateAndIcons */}
                        <View style={styles.blogDateAndIcons}>
                          
                          {/* timeIcon */}
                          <Image
                            style={styles.timeIcon}
                            source={require('../images/timeicon.png')}
                            resizeMode="contain"
                          />
                          
                           {/* date */}
                          <Text style={styles.dateText}>{item.date}</Text>
                          
                          {/* BlogFormEdit Icon */}
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('BlogFormEdit', item);
                            }}>
                            <Image
                              style={styles.editIcon}
                              source={require('../images/editiconblack.png')}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                          
                           {/* deleteIconSmall */}
                          <TouchableOpacity
                            onPress={() => deleteCurrent(item.key)}>
                            <Image
                              style={styles.deleteIconSmall}
                              source={require('../images/deleteiconblack.png')}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))
              : 
              
              // checking if the blogs list is empty
              null}
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

  blogListContainer: {
    borderRadius: 15,
    marginTop: 10,
    backgroundColor: 'white',
    width: width * 0.9,
  },
  searchAndIconsBox: {
    flexDirection: 'row',
    width: width * 0.9,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    width: width * 0.6,
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  searchInput: { fontSize: 20, width: width * 0.4, padding: 2 },
  searchIcon: { height: height * 0.1, width: width * 0.1 },
  searchStopIcon: { height: height * 0.1, width: width * 0.1 },

  deleteIconBig: { height: height * 0.05, width: width * 0.1 },
  blogItemsListBox: {
    flexDirection: 'row',
    width: width * 0.9,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blogItemImage: {
    height: height * 0.19,
    width: width * 0.32,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  blogItemRightSection: {
    flex: 1,
    width: width * 0.6,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -20,
  },
  checkedBox: { alignSelf: 'flex-end' },
  checkedBoxImage: {
    height: height * 0.035,
    width: width * 0.065,
    marginTop: 15,
  },
  uncheckedBox: { alignSelf: 'flex-end' },
  uncheckedBoxImage: {
    height: height * 0.03,
    width: width * 0.06,
    marginTop: 15,
  },
  blogTitle: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    marginTop: -15,
    width: width * 0.4,
  },
  blogTitleText: { fontSize: 22 },

  blogContent: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    height: height * 0.07,
  },
  blogContentText: { fontSize: 15 },
  blogDateAndIcons: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },

  timeIcon: { height: height * 0.04, width: width * 0.08, marginLeft: 5 },

  dateText: { fontSize: 13, marginLeft: width * 0.01 },

  editIcon: {
    height: height * 0.035,
    width: width * 0.08,
    marginLeft: width * 0.04,
  },
  deleteIconSmall: {
    height: height * 0.03,
    width: width * 0.08,
    marginLeft: width * 0.02,
  },
});

// export BlogList Component
export default BlogList;
