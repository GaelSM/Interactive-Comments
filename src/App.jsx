import { useEffect, useState } from 'react'
import Comment from './Comment'
import Form from './Form'
import data from './data.json'
import './App.css'

export default function App() {

  const [comments, setComments] = useState([])
  const [currentId, setCurrentId] = useState(0)
  const [change, setChange] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("comments") === null) localStorage.setItem("comments", JSON.stringify(data.comments))
    else setComments(JSON.parse(localStorage.getItem("comments")))
    if(localStorage.getItem("id") === null) localStorage.setItem("id", 4)
    else setCurrentId(Number(localStorage.getItem("id")))
  }, [currentId, change])

  useEffect(() => {
    setChange(true)
  }, [])

  const handleCreate = (e) => {
    e.preventDefault()
    const {text} = Object.fromEntries(new FormData(e.target))
    if(text === "") return

    let newItem = [...comments, {
      "id": currentId + 1,
      "content": text,
      "createdAt": "Now",
      "score": 0,
      "user": {
        "image": "https://raw.githubusercontent.com/GaelSM/Interactive-Comments/main/images/avatars/image-juliusomo.png",
        "username": "juliusomo"
      },
      "replies": []
    }]

    setCurrentId(currentId + 1)
    localStorage.setItem("id", currentId + 1)

    setComments(newItem)
    localStorage.setItem("comments", JSON.stringify(newItem))

    e.target.reset()
  }

  return (
      <main>
        {
          comments.length > 0 && comments.map((reply, index) => 
            <Comment 
              {...reply} 
              key={reply.id}
              userImage={reply.user.image}
              sangria={false} 
              currentUser={data.currentUser} 
              setComments={setComments} 
              data={comments} 
              index={index}
              currentId={currentId}
              setCurrentId={setCurrentId}
              setChange={setChange}
              fatherIndex={null}
            />
          )
        }
        <Form type={"send"} currentUser={data.currentUser} handleCreate={handleCreate}/>
      </main>
  )
} 
