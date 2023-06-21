import { useState } from "react"
import Form from "./Form"
import Modal from "./Modal"

export default function Comment({index, score, user, createdAt, content, replies, sangria, currentUser, replyingTo, setComments, data, currentId, setCurrentId, fatherIndex, setChange}) {

  const [isReply, setIsReply] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const handleReply = () => setIsReply(!isReply)

  const handleCreateReply = (e) => {
    e.preventDefault()
    const {text} = Object.fromEntries(new FormData(e.target))

    if(text === "") return

    let newIndex = fatherIndex === null ? index : fatherIndex

    let newReplies = data[newIndex].replies
    newReplies = [...newReplies,  {
      "id": currentId + 1,
      "content": text,
      "createdAt": "Now",
      "score": 0,
      "replyingTo": user.username,
      "user": {
        "image": "https://raw.githubusercontent.com/GaelSM/Interactive-Comments/main/images/avatars/image-juliusomo.png",
        "username": "juliusomo"
      }
    }]
    let newData = data
    newData[newIndex].replies = newReplies
    setComments(newData)
    localStorage.setItem("comments", JSON.stringify(newData))
    setIsReply(false)
    setCurrentId(currentId + 1)
    localStorage.setItem("id", currentId + 1)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    const {text} = Object.fromEntries(new FormData(e.target))
    if(text === "") return
    let newData = data

    if(fatherIndex === null) newData[index].content = text
    else newData[fatherIndex].replies[index].content = text

    setComments(newData)
    setIsEdit(false)
    localStorage.setItem("comments", JSON.stringify(newData))
    setChange(preview => !preview)
  }

  const handleDelete = () => {
    let newData = data

    if(fatherIndex === null){
      newData = data.filter((_, i) => i !== index)
    }else{
      newData[fatherIndex].replies = data[fatherIndex].replies.filter((_, i) => i !== index)
    }

    setComments(newData)
    localStorage.setItem("comments", JSON.stringify(newData))
    setChange(preview => !preview)
  }

    return (
      <>
        { isDelete && <Modal setIsDelete={setIsDelete} handleDelete={handleDelete}/> }
        <section className={sangria ? "sangria" : ""}>
          <div className="comments">
            <article>
              <div className="likes">
                <button>
                  <img src="./images/icon-plus.svg" alt="Plus Icon" />
                </button>
                <p> {score} </p>
                <button>
                  <img src="./images/icon-minus.svg" alt="Minus Icon" />
                </button>
              </div>
              <div className="content">
                <div className="header">
                  <div className="user">
                    <img src={user.image} alt="User Image" />
                    <p> <span> {user.username} </span> </p>
                    {currentUser.username === user.username ? <div> you </div> : ""}
                    <p> {createdAt} </p>
                  </div>
                  {
                      currentUser.username === user.username
                      ?
                      <div className="options">
                          <div className="delete" onClick={() => setIsDelete(true)}>
                              <img src="./images/icon-delete.svg" alt="Delete Icon" />
                              <p> Delete </p>
                          </div>
                          <div className="edit" onClick={() => setIsEdit(!isEdit)}>
                              <img src="./images/icon-edit.svg" alt="Delete Icon" />
                              <p> Edit </p>
                          </div>
                      </div>
                      :
                      <div className="reply" onClick={handleReply}>
                          <img src="./images/icon-reply.svg" alt="Reply Icon" />
                          <p> Reply </p>
                      </div>
                  }
                </div>
                <div className="text">
                  {
                    isEdit 
                    ?
                      <form onSubmit={(e) => handleEdit(e)}>
                        <textarea name="text"></textarea>
                        <button> Edit </button>
                      </form>
                    :
                    <p> {replyingTo && <span>{"@"+replyingTo}</span>} {content} </p>
                  }
                </div>
              </div>
            </article>
            {
              isReply && <Form type={"reply"} currentUser={currentUser} handleCreate={(e) => handleCreateReply(e)}/>
            }
            {
              replies && replies.map((reply, i) =>
                <Comment 
                  {...reply} 
                  key={reply.id} 
                  sangria={true} 
                  currentUser={currentUser} 
                  setComments={setComments} 
                  data={data} 
                  index={i}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                  fatherIndex={index}
                  setChange={setChange}
                />
              )
            }
          </div>
        </section>
      </>
    )
}
