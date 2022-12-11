
const BASE_URL = 'http://localhost:4000/posts'

export const getPosts = async () =>
    fetch(BASE_URL).then(res => res.json())

export const updatePost = async (post) =>
    fetch(`${BASE_URL}/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then(res => res.json())

export const createPost = async (title) =>
    fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title})
    }).then(res => res.json())
export const deletePost = async (post) =>
    fetch(`${BASE_URL}/${post.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then(res => res.json())

