
// importing the action types from types 
import { ADD_BLOG, DELETE_BLOG } from './types';

// addBlog action and exporting the action
export const addBlog = (blog) => (
  {
    type: ADD_BLOG,
    title: blog.title,
    image: blog.image,
    content: blog.content,
    attachments: blog.attachments,
    date: blog.date
  }
);

// deleteBlog action and exporting the action
export const deleteBlog = (key) => (
  {
    type: DELETE_BLOG,
    key: key
  }
);
