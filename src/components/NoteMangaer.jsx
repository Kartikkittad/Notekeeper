import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt, faPencil, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import './NoteManager.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteManager = ({ selectedColor }) => {
    const [inputText, setInputText] = useState('');
    const [savedNotes, setSavedNotes] = useState([]);
    const [editText, setEditText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [notesPerPage, setNotesPerPage] = useState(6);

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setSavedNotes(storedNotes);
    }, []);

    const deleteNote = (id) => {
        const updatedNotes = savedNotes.filter((note) => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setSavedNotes(updatedNotes);
        toast.error('Note deleted');
    };

    const editNote = (id) => {
        const noteToEdit = savedNotes.find((note) => note.id === id);
        setEditText(noteToEdit.text);
        const updatedNotes = savedNotes.map((note) =>
            note.id === id ? { ...note, isEditing: true } : { ...note, isEditing: false }
        );
        setSavedNotes(updatedNotes);
    };

    const saveEditedNote = (id, newText) => {
        const updatedNotes = savedNotes.map((note) =>
            note.id === id ? { ...note, text: newText, isEditing: false } : note
        );
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setSavedNotes(updatedNotes);
        toast.success('Note updated');
    };

    const saveNote = () => {
        if (!inputText.trim()) return;
        const newNote = {
            id: Date.now(),
            text: inputText,
            color: selectedColor,
            date: new Date().toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
            pinned: false
        };
        const updatedNotes = [newNote, ...savedNotes];
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setInputText('');
        toast.success('Note added');
        setSavedNotes(updatedNotes);
    };

    const togglePinNote = (id) => {
        const noteToToggle = savedNotes.find(note => note.id === id);
        const updatedNotes = savedNotes.map((note) =>
            note.id === id ? { ...note, pinned: !note.pinned } : note
        );
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        if (noteToToggle.pinned) {
            toast.success('Note Unpinned');
        } else {
            toast.success('Note Pinned');
        }
        setSavedNotes(updatedNotes);
    };

    const sortedNotes = [...savedNotes].sort((a, b) => b.pinned - a.pinned);

    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = sortedNotes.slice(indexOfFirstNote, indexOfLastNote);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="note-manager">
            <h3>Notes</h3>
            <div className="notes-container">
                <div className="note new-note" style={{ backgroundColor: selectedColor }}>
                    <textarea
                        value={inputText}
                        placeholder="Type...."
                        onChange={(e) => setInputText(e.target.value)}
                        maxLength="50"
                    ></textarea>
                    <div className='bottomNote'>
                        <span className='label'>{50 - inputText.length} left</span>
                        <div className="note-actions">
                            <FontAwesomeIcon style={{ backgroundColor: 'black', fontSize: '0.8em', padding: '12px 12px', borderRadius: '50%', color: 'white', marginRight: '10px', cursor: 'pointer' }} icon={faSave} onClick={saveNote} />
                        </div>
                    </div>
                </div>
                {currentNotes.map((note) => (
                    <div key={note.id} className="note" style={{ backgroundColor: note.color }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            {note.isEditing ? (
                                <textarea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onBlur={() => saveEditedNote(note.id, editText.trim() === '' ? note.text : editText)}
                                    autoFocus={note.isEditing}
                                ></textarea>
                            ) : (
                                <p className='data'>{note.text}</p>
                            )}
                            <div>
                                <FontAwesomeIcon className={`pin ${note.pinned ? 'pinned' : ''}`} icon={faThumbtack} onClick={() => togglePinNote(note.id)} />
                            </div>
                        </div>
                        <div className='note-actions2'>
                            <p className='date'>{note.date}</p>
                            <div className="note-actions">
                                {!note.isEditing ? (
                                    <FontAwesomeIcon className='edit' icon={faPencil} onClick={() => editNote(note.id)} />
                                ) : (
                                    <FontAwesomeIcon className='save2' icon={faSave} onClick={(e) => {
                                        e.stopPropagation();
                                        saveEditedNote(note.id, editText.trim() === '' ? note.text : editText);
                                    }} />
                                )}
                                <FontAwesomeIcon className='delete' icon={faTrashAlt} onClick={() => deleteNote(note.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(savedNotes.length / notesPerPage) }, (_, index) => (
                    <button className='page' key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default NoteManager;
