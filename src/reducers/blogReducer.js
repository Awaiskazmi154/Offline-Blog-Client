import { ADD_BLOG, DELETE_BLOG} from '../actions/types';

const initialState = {
  blogList: []
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BLOG:
      return {
        ...state,
        blogList: state.blogList.concat({
          key: Math.random(),
          title: action.title,
          image: action.image,
          content: action.content,
          attachments: action.attachments,
          date: action.date
        })
      };

    case DELETE_BLOG:
      return {
        ...state,
        blogList: state.blogList.filter((item) =>
          item.key !== action.key)
      };
    default:
      return state;
  }
}

export default blogReducer;