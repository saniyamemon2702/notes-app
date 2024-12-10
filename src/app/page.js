"use client"
import Image from "next/image";
import Link from 'next/link'
import { useEffect, useState } from "react";
import { MdEditRoad, MdNoteAdd } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEditDocument } from "react-icons/md";
import AddNote from '../components/addNote'

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showEditNote, setShowEdiNote]= useState(null);
  // fetch data from notesDB using API
  useEffect(()=>{
    const fetchNotes=async()=>{
      const response=await fetch('http://localhost:3000/notes');
      const data=await response.json();
      // sorting based on createdAt
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotes(data);
    }
    fetchNotes();
  },[]);

  // to add new note
  const handleAddNote = (newNote, edit=false) => {
    if(edit){
      let newNoteList=notes.filter((note)=>note._id!==newNote._id)
      setNotes((prevNotes)=>[...newNoteList, newNote])
      setShowEdiNote(null);
    }
    else
      setNotes((prevNotes) => [...prevNotes, newNote]);
    setShowAddNote(false)
  };
  // to delete a note
  const handleDeleteNote=async(noteId)=>{
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        const res = await fetch(`http://localhost:3000/notes/${noteId}`, {
          method: 'DELETE',
        });
  
        if (res.ok) {
          setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
        } else {
          alert('Failed to delete the note');
        }
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('An error occurred while deleting the note');
      }
    }
  }
 

  const handleCancel = (edit) => {
    if(edit)
      setShowEdiNote(null)
    setShowAddNote(false); // Hide the form without adding a note
  };
  return (

    <div className="space-y-6">
      <div className=" py-2 border-b border-b-2 border-b-white flex justify-between items-center">
        <h2 className="text-xl lg:text-2xl">Your Notes</h2>
        {!showAddNote && (
          <button  onClick={() => setShowAddNote(true)} className="text-xl p-2 bg-gray-900 border-gray-900 rounded drop-shadow-md">
          <MdNoteAdd />
        </button>
      )} 
      </div>
     {showAddNote && <AddNote onAdd={handleAddNote} onCancel={handleCancel}/>}
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note._id} className="bg-gray-600 p-6 rounded-lg shadow-lg flex flex-col gap-1">
            {showEditNote!==note._id &&<h3 className="text-xl font-semibold uppercase">{note.title}</h3>}
            {showEditNote!==note._id && <p>{note.content}</p>}
            {showEditNote===note._id && <AddNote onAdd={handleAddNote} onCancel={handleCancel} edit={true} title={note.title} content={note.content} id={note._id}/>}
            <div className="flex justify-end gap-2 items-center">
              {/* delet button */}
              <button onClick={() => handleDeleteNote(note._id)} className="text-xl p-2 bg-gray-900 border-gray-900 rounded drop-shadow-md" ><RiDeleteBin6Fill fontSize={"large"}/></button>
              {/* edit button */}
             {showEditNote!==note._id && <button  onClick={() =>  setShowEdiNote(note._id)} className="text-xl p-2 bg-gray-900 border-gray-900 rounded drop-shadow-md" ><MdEditDocument fontSize={"large"}/></button>}
            </div>
          </div>
        ))}
      </div>
  </div>
  );
}
