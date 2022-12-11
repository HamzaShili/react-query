import axios from 'axios';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools"
import './App.css';
import { createPost, deletePost, getPosts, updatePost } from './services/api';

const axiosClient = axios.create({
  baseURL: "http://localhost:4000/"
})
const queryClient = new QueryClient()

const Posts = () => {
  // const { data: posts } = useQuery("posts", getPosts, {
  //   initialData: []
  // })

  const { data: posts } = useQuery(
    "posts",
    async () => (await axiosClient.get("posts")).data
  )
  // const updateMutation = useMutation(updatePost, {
  //   onSuccess: () => queryClient.invalidateQueries("posts")
  // })

  const updateMutation = useMutation(
    (post) => axiosClient.put(`posts/${post.id}`, post),
    {
      // onSettled means onSuccess or onError 
      onSettled: () => queryClient.invalidateQueries("posts")
    }
  )

  // const deleteMutation = useMutation(deletePost, {
  //   onSuccess: () => queryClient.invalidateQueries("posts")
  // })

  const deleteMutation = useMutation(
    (post) => axiosClient.delete(`posts/${post.id}`),
    {
      onSettled: () => queryClient.invalidateQueries("posts")
    }
  )

  // const createMutation = useMutation(createPost, {
  //   onSuccess: () => queryClient.invalidateQueries("posts")
  // })

  const createMutation = useMutation(
    (data) => axiosClient.post("posts", data),
    {
      onSettled: () => {
        queryClient.invalidateQueries("posts")
        titleRef.current.value = ""
      }
    }
  )
  const titleRef = useRef(null)
  console.log(posts)
  return (
    <div className="App">
      {posts?.map(p => (
        <div key={p.id}>
          <div>
            <input
              type="checkbox"
              checked={p.published}
              onChange={() =>
                updateMutation.mutate({ ...p, published: !p.published })
              }
            />
            <span>{p.title}</span>
            <button onClick={() => {
              deleteMutation.mutate(p)
            }}>Delete</button>
          </div>
        </div>
      ))}
      <div>
        <input type="text" ref={titleRef} />
        <button onClick={() => {
          createMutation.mutate({ title: titleRef.current.value ?? '' })
        }}>Add</button>
      </div>
    </div>
  )
}
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
      <ReactQueryDevtools />
    </QueryClientProvider>

  );
}

export default App;
